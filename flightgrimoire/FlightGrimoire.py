import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import serial  # type: ignore
import serial.tools.list_ports  # type: ignore
import threading
import time
import os
from datetime import datetime

# Import the UBX parser (will be created separately)
try:
    # CORRECTED: Import the module by its filename without the .py extension.
    import HPPOSLLH_to_CSV
    UBX_PARSER_AVAILABLE = True
except ImportError:
    UBX_PARSER_AVAILABLE = False

class SerialReaderApp:
    """
    A GUI application for logging serial data to a file.
    
    Features:
    - Auto-detects available COM ports.
    - Dropdown for selecting standard baud rates.
    - Automatically names output files with a timestamp.
    - Displays live data rate and total data size.
    - Post-processes UBX files to CSV format.
    """
    def __init__(self, root):
        self.root = root
        self.root.title("FlightGrimoire")
        self.root.resizable(False, False)  # Prevent window resizing

        # --- Instance Variables ---
        self.running = False
        self.ser = None
        self.thread = None
        self.current_filename = None
        
        # Variables for data tracking
        self.total_bytes = 0
        self.start_time = 0
        self.last_update_time = 0
        self.bytes_since_last_update = 0
        self.data_rate = 0.0

        # --- Theme Setup ---
        self._setup_theme()

        # --- UI Setup ---
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        self._create_widgets(main_frame)
        self.populate_com_ports()

    def _setup_theme(self):
        """Configure the application theme with consistent colors."""
        style = ttk.Style(self.root)
        style.theme_use('clam')

        # Consistent color scheme
        bg_color     = "#121212"  # main background
        frame_bg     = "#1e1e1e"  # frame background
        text_fg      = "#e0e0e0"  # light gray text
        accent       = "#ffffff"  # blue accent
        button_font  = ("Segoe UI", 10, "bold")
        label_font   = ("Segoe UI", 10)
        status_font  = ("Segoe UI", 10, "bold")

        # Set overall window background
        self.root.configure(bg=bg_color)

        # Frames
        style.configure("TFrame", background=bg_color)
        style.configure("TLabelframe", background=frame_bg, foreground=text_fg, relief="flat")
        style.configure("TLabelframe.Label", background=frame_bg, foreground=accent, font=status_font)

        # Labels (default for most labels, including COM/baud, status fields now)
        style.configure("TLabel", background=frame_bg, foreground=text_fg, font=label_font)

        # Combobox
        style.configure("TCombobox",
                        fieldbackground=frame_bg,
                        background=frame_bg,
                        foreground="#333333",
                        arrowcolor=accent,
                        selectforeground="#ffffff")

        # Buttons
        style.configure("TButton", padding=(8, 6), font=button_font)
        
        style.configure("Start.TButton", background="#28a745", foreground="white")
        style.map("Start.TButton", background=[("active", "#218838"), ("disabled", "#555555")])
        
        style.configure("Stop.TButton", background="#dc3545", foreground="white")
        style.map("Stop.TButton", background=[("active", "#c82333"), ("disabled", "#555555")])
        
        style.configure("Process.TButton", background="#6f42c1", foreground="white")
        style.map("Process.TButton", background=[("active", "#5a2a9d"), ("disabled", "#555555")])

        # New: Orange style for "Process Custom File"
        style.configure("CustomProcess.TButton", background="#ff8800", foreground="white")
        style.map("CustomProcess.TButton", background=[("active", "#e67600"), ("disabled", "#555555")])
        
        style.configure("Refresh.TButton", background="#17a2b8", foreground="white")
        style.map("Refresh.TButton", background=[("active", "#138496"), ("disabled", "#555555")])

    def _create_widgets(self, parent):
        """Creates and arranges all the UI widgets."""
        # --- Configuration Frame ---
        config_frame = ttk.LabelFrame(parent, text="Configuration", padding="10")
        config_frame.grid(row=0, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)

        # COM Port Selector
        ttk.Label(config_frame, text="COM Port:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        self.port_var = tk.StringVar()
        self.port_combo = ttk.Combobox(config_frame, textvariable=self.port_var, width=20, state='readonly')
        self.port_combo.grid(row=0, column=1, padx=5, pady=5)
        
        # Refresh button for COM ports - made consistent size
        self.refresh_button = ttk.Button(config_frame, text="Refresh", command=self.populate_com_ports, 
                                        style="Refresh.TButton", width=12)
        self.refresh_button.grid(row=0, column=2, padx=5, pady=5)

        # Baud Rate Selector
        ttk.Label(config_frame, text="Baud Rate:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.baud_var = tk.StringVar()
        baud_rates = ['9600', '19200', '38400', '57600', '115200', '230400', '460800', '921600']
        self.baud_combo = ttk.Combobox(config_frame, textvariable=self.baud_var, values=baud_rates, width=20, state='readonly')
        self.baud_combo.set('115200')
        self.baud_combo.grid(row=1, column=1, padx=5, pady=5)

        # --- Control Buttons ---
        button_frame = ttk.Frame(parent)
        button_frame.grid(row=1, column=0, columnspan=2, pady=10, sticky="ew")
        button_frame.columnconfigure(0, weight=1)
        button_frame.columnconfigure(1, weight=1)

        self.start_button = ttk.Button(button_frame, text="Start Recording", command=self.start_logging, 
                                      style="Start.TButton")
        self.start_button.grid(row=0, column=0, padx=5, sticky="ew")

        self.stop_button = ttk.Button(button_frame, text="Stop Recording", command=self.stop_logging, 
                                     state=tk.DISABLED, style="Stop.TButton")
        self.stop_button.grid(row=0, column=1, padx=5, sticky="ew")

        # --- Status Display ---
        status_frame = ttk.LabelFrame(parent, text="Status", padding="10")
        status_frame.grid(row=2, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        self.size_var = tk.StringVar(value="Total Size: 0 B")
        ttk.Label(status_frame, textvariable=self.size_var).pack(anchor="w")

        self.rate_var = tk.StringVar(value="Data Rate: 0 B/s")
        ttk.Label(status_frame, textvariable=self.rate_var).pack(anchor="w")

        # --- Post Processing Frame ---
        process_frame = ttk.LabelFrame(parent, text="Post Processing", padding="10")
        process_frame.grid(row=3, column=0, columnspan=2, sticky=(tk.W, tk.E), pady=5)
        
        # Status label for last recorded file
        self.file_status_var = tk.StringVar(value="No file recorded yet")
        ttk.Label(process_frame, textvariable=self.file_status_var).pack(anchor="w", pady=(0, 10))
        
        # Process button frame
        process_button_frame = ttk.Frame(process_frame)
        process_button_frame.pack(fill="x")
        process_button_frame.columnconfigure(0, weight=1)
        process_button_frame.columnconfigure(1, weight=1)
        
        self.process_latest_button = ttk.Button(process_button_frame, text="Process Latest File", 
                                                command=self.process_latest_file, style="Process.TButton",
                                                state=tk.DISABLED)
        self.process_latest_button.grid(row=0, column=0, padx=5, sticky="ew")
        
        self.process_custom_button = ttk.Button(process_button_frame, text="Process Custom File", 
                                                command=self.process_custom_file, style="CustomProcess.TButton")
        self.process_custom_button.grid(row=0, column=1, padx=5, sticky="ew")

    def populate_com_ports(self):
        """Finds available COM ports and updates the dropdown menu."""
        try:
            ports = [port.device for port in serial.tools.list_ports.comports()]
            self.port_combo['values'] = ports
            if ports:
                self.port_var.set(ports[0])
            else:
                self.port_var.set("No ports found")
        except Exception as e:
            messagebox.showerror("Error", f"Could not list COM ports: {e}")
            self.port_var.set("Error")

    def start_logging(self):
        """Starts the serial data logging process."""
        port = self.port_var.get()
        if not port or "No ports found" in port or "Error" in port:
            messagebox.showerror("Error", "Please select a valid COM port.")
            return
            
        baud = int(self.baud_var.get())
        
        # Generate filename from current date and time
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        self.current_filename = f"log_{timestamp}.ubx"

        try:
            self.ser = serial.Serial(port, baudrate=baud, timeout=0.1)
        except serial.SerialException as e:
            messagebox.showerror("Serial Error", f"Failed to open port '{port}':\n{e}")
            return

        try:
            self.file = open(self.current_filename, "wb")
        except IOError as e:
            messagebox.showerror("File Error", f"Failed to open file '{self.current_filename}':\n{e}")
            self.ser.close()
            return

        # Initialize tracking variables and start thread
        self.running = True
        self.total_bytes = 0
        self.bytes_since_last_update = 0
        self.start_time = time.time()
        self.last_update_time = self.start_time
        
        self.thread = threading.Thread(target=self.read_serial, daemon=True)
        self.thread.start()

        # Update UI state
        self.start_button.config(state=tk.DISABLED)
        self.stop_button.config(state=tk.NORMAL)
        self.port_combo.config(state=tk.DISABLED)
        self.baud_combo.config(state=tk.DISABLED)
        self.refresh_button.config(state=tk.DISABLED)
        
        # Update file status
        self.file_status_var.set(f"Recording to: {self.current_filename}")
        
        # Start the periodic GUI update
        self.update_gui_status()

    def stop_logging(self):
        """Stops the logging process."""
        self.running = False
        if self.thread:
            self.thread.join(timeout=1)

        if self.ser and self.ser.is_open:
            self.ser.close()
        if hasattr(self, "file") and not self.file.closed:
            try:
                self.file.flush()
                os.fsync(self.file.fileno())
            except Exception as e:
                print(f"Warning: Could not flush/sync file on close: {e}")
            self.file.close()

        # Update UI state
        self.rate_var.set("Data Rate: 0 B/s (Stopped)")
        self.start_button.config(state=tk.NORMAL)
        self.stop_button.config(state=tk.DISABLED)
        self.port_combo.config(state='readonly')
        self.baud_combo.config(state='readonly')
        self.refresh_button.config(state=tk.NORMAL)
        
        # Enable process button if we have a file
        if self.current_filename and os.path.exists(self.current_filename):
            self.process_latest_button.config(state=tk.NORMAL)
            self.file_status_var.set(f"Last recorded: {self.current_filename}")

    def read_serial(self):
        """Worker thread function to read from serial and write to file."""
        while self.running:
            try:
                data = self.ser.read(self.ser.in_waiting or 1)
                if data:
                    self.file.write(data)
                    self.file.flush()  # Ensures data is written to disk
                    num_bytes = len(data)
                    self.total_bytes += num_bytes
                    self.bytes_since_last_update += num_bytes
            except serial.SerialException as e:
                self.running = False
                # Schedule the error message to be shown in the main thread
                self.root.after(0, lambda: messagebox.showerror("Serial Error", f"Device disconnected or error:\n{e}"))
                break
            except IOError as e:
                self.running = False
                self.root.after(0, lambda: messagebox.showerror("File Error", f"Could not write to file (disk full?):\n{e}"))
                break

    def update_gui_status(self):
        """Periodically updates the status labels in the GUI."""
        if not self.running:
            return

        current_time = time.time()
        elapsed = current_time - self.last_update_time

        # Calculate data rate
        if elapsed > 0:
            self.data_rate = self.bytes_since_last_update / elapsed
        
        # Reset for next interval
        self.bytes_since_last_update = 0
        self.last_update_time = current_time

        # Update the StringVars to refresh the GUI
        self.size_var.set(f"Total Size: {self._format_bytes(self.total_bytes)}")
        self.rate_var.set(f"Data Rate: {self._format_bytes(self.data_rate)}/s")
        
        # Schedule the next update in 500ms
        self.root.after(500, self.update_gui_status)

    def process_latest_file(self):
        """Process the most recently recorded UBX file to CSV."""
        if not self.current_filename or not os.path.exists(self.current_filename):
            messagebox.showerror("Error", "No valid file to process.")
            return
        
        self._process_ubx_file(self.current_filename)

    def process_custom_file(self):
        """Allow user to select and process any UBX file."""
        filename = filedialog.askopenfilename(
            title="Select UBX file to process",
            filetypes=[("UBX files", "*.ubx"), ("All files", "*.*")]
        )
        
        if filename:
            self._process_ubx_file(filename)

    def _process_ubx_file(self, filename):
        """Process a UBX file using the imported parser."""
        if not UBX_PARSER_AVAILABLE:
            # CORRECTED: Typo in filename from .py.py to .py
            messagebox.showerror("Parser Error", 
                                "HPPOSLLH_to_CSV.py not found or could not be imported.\n"
                                "Please ensure the parser file is in the same directory.")
            return
        
        try:
            # Generate output filename
            base_name = os.path.splitext(filename)[0]
            output_filename = f"{base_name}.csv"
            
            # CORRECTED: Call the correct function from the imported module.
            # The parser module will print its own status messages to the console.
            if hasattr(HPPOSLLH_to_CSV, 'process_file_to_csv'):
                HPPOSLLH_to_CSV.process_file_to_csv(filename, output_filename)
                messagebox.showinfo("Success", f"Processing complete!\nOutput file: {output_filename}")
            else:
                messagebox.showerror("Parser Error", 
                                     "Parser function 'process_file_to_csv' not found in HPPOSLLH_to_CSV.py.")
                
        except Exception as e:
            messagebox.showerror("Processing Error", f"Failed to process file:\n{e}")

    @staticmethod
    def _format_bytes(size_bytes):
        """Converts a size in bytes to a human-readable string (KB, MB, GB)."""
        if size_bytes <= 0:
            return "0 B"
        size_name = ("B", "KB", "MB", "GB", "TB")
        i = 0
        while size_bytes >= 1024 and i < len(size_name) - 1:
            size_bytes /= 1024.0
            i += 1
        return f"{size_bytes:.2f} {size_name[i]}"

if __name__ == "__main__":
    root = tk.Tk()
    app = SerialReaderApp(root)
    root.mainloop()