import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import serial  # type: ignore
import serial.tools.list_ports  # type: ignore
import threading
import time
import os
import sys  # Added to determine the application's path
from datetime import datetime
from PIL import Image, ImageTk  # For logo handling
import ctypes

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
    - Enhanced modern UI with logo integration.
    - Output folder selection with executable's directory as default.
    """
    def __init__(self, root):
        self.root = root
        self.root.title("FlightGrimoire")
        self.root.resizable(False, False)  # Prevent window resizing
        
        # Try to set window icon
        self._set_window_icon()

        # --- Instance Variables ---
        self.running = False
        self.ser = None
        self.thread = None
        self.current_filename = None
        self.logo_image = None
        
        # --- MODIFIED ---
        # Output folder - default to the application's directory
        if getattr(sys, 'frozen', False):
            # Running as a bundled executable (e.g., from PyInstaller)
            application_path = os.path.dirname(sys.executable)
        else:
            # Running as a .py script
            application_path = os.path.dirname(os.path.abspath(__file__))
        self.output_folder = application_path
        
        # Variables for data tracking
        self.total_bytes = 0
        self.start_time = 0
        self.last_update_time = 0
        self.bytes_since_last_update = 0
        self.data_rate = 0.0

        # --- Theme Setup ---
        self._setup_theme()

        # --- UI Setup ---
        main_frame = ttk.Frame(self.root, padding="15")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        self._create_widgets(main_frame)
        self.populate_com_ports()

    def _set_window_icon(self):
        """Try to set the window icon from logo file."""
        try:
            # Common logo file names to try
            logo_files = ['logo.ico', 'logo.png', 'logo.jpg', 'logo.jpeg', 'icon.ico', 'icon.png']
            
            for logo_file in logo_files:
                if os.path.exists(logo_file):
                    if logo_file.endswith('.ico'):
                        self.root.iconbitmap(logo_file)
                    else:
                        # For PNG/JPG, convert to PhotoImage
                        img = Image.open(logo_file)
                        img = img.resize((32, 32), Image.Resampling.LANCZOS)
                        icon = ImageTk.PhotoImage(img)
                        self.root.iconphoto(False, icon)
                    break
        except Exception:
            pass  # Silently fail if logo can't be loaded

    def _load_logo(self):
        """Load and resize logo for display in the UI."""
        try:
            logo_files = ['logo.png', 'logo.jpg', 'logo.jpeg', 'logo.ico']
            
            for logo_file in logo_files:
                if os.path.exists(logo_file):
                    img = Image.open(logo_file)
                    # Resize to a reasonable size for the header
                    img = img.resize((48, 48), Image.Resampling.LANCZOS)
                    self.logo_image = ImageTk.PhotoImage(img)
                    return True
        except Exception:
            pass
        return False

    def _setup_theme(self):
        """Configure the application theme with consistent colors."""
        style = ttk.Style(self.root)
        style.theme_use('clam')

        # Enhanced color scheme
        bg_color     = "#0f0f0f"  # darker main background
        frame_bg     = "#1a1a1a"  # frame background
        card_bg      = "#0f0f0f"  # card/container background
        text_fg      = "#e8e8e8"  # light gray text
        accent       = "#ffffff"  # blue accent
        success      = "#28a745"  # green for success
        danger       = "#dc3545"  # red for danger
        warning      = "#ffc107"  # yellow for warning
        info         = "#17a2b8"  # cyan for info
        purple       = "#6f42c1"  # purple for special actions
        orange       = "#fd7e14"  # orange for custom actions
        teal         = "#20c997"  # teal for folder selection
        
        button_font  = ("Segoe UI", 10, "bold")
        label_font   = ("Segoe UI", 10)
        status_font  = ("Segoe UI", 10, "bold")
        title_font   = ("Segoe UI", 16, "bold")

        # Set overall window background
        self.root.configure(bg=bg_color)

        # Frames
        style.configure("TFrame", background=bg_color)
        style.configure("Card.TFrame", background=card_bg, relief="flat", borderwidth=1)
        style.configure("TLabelframe", background=card_bg, foreground=text_fg, relief="flat", borderwidth=1)
        # Modified style for plain white bold text labels
        style.configure("TLabelframe.Label", background=card_bg, foreground="white", font=status_font)

        # Labels
        style.configure("TLabel", background=card_bg, foreground=text_fg, font=label_font)
        style.configure("Title.TLabel", background=bg_color, foreground=accent, font=title_font)
        style.configure("Status.TLabel", background=card_bg, foreground=text_fg, font=status_font)
        style.configure("Success.TLabel", background=card_bg, foreground=success, font=status_font)
        style.configure("Warning.TLabel", background=card_bg, foreground=warning, font=status_font)

        # Combobox
        style.configure("TCombobox",
                        fieldbackground=frame_bg,
                        background=frame_bg,
                        foreground=text_fg,
                        arrowcolor=accent,
                        borderwidth=1,
                        relief="flat")
        style.map("TCombobox",
                  fieldbackground=[("readonly", frame_bg)],
                  selectbackground=[("readonly", info)],
                  selectforeground=[("readonly", text_fg)])

        # Enhanced Button Styles
        style.configure("TButton", 
                        padding=(12, 8), 
                        font=button_font,
                        relief="flat",
                        borderwidth=1)
        
        # Primary action button (Start)
        style.configure("Start.TButton", 
                        background=success, 
                        foreground="white",
                        focuscolor="none")
        style.map("Start.TButton", 
                  background=[("active", "#218838"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])
        
        # Danger button (Stop)
        style.configure("Stop.TButton", 
                        background=danger, 
                        foreground="white",
                        focuscolor="none")
        style.map("Stop.TButton", 
                  background=[("active", "#c82333"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])
        
        # Secondary buttons
        style.configure("Secondary.TButton", 
                        background=frame_bg, 
                        foreground=text_fg,
                        focuscolor="none")
        style.map("Secondary.TButton", 
                  background=[("active", "#333333"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])
        
        # Process button
        style.configure("Process.TButton", 
                        background=purple, 
                        foreground="white",
                        focuscolor="none")
        style.map("Process.TButton", 
                  background=[("active", "#5a2a9d"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])

        # Custom process button
        style.configure("CustomProcess.TButton", 
                        background=orange, 
                        foreground="white",
                        focuscolor="none")
        style.map("CustomProcess.TButton", 
                  background=[("active", "#e67600"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])
        
        # Info button (Refresh)
        style.configure("Refresh.TButton", 
                        background=info, 
                        foreground="white",
                        focuscolor="none")
        style.map("Refresh.TButton", 
                  background=[("active", "#138496"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])

        # Folder selection button
        style.configure("Folder.TButton", 
                        background=teal, 
                        foreground="white",
                        focuscolor="none")
        style.map("Folder.TButton", 
                  background=[("active", "#1ba085"), ("disabled", "#555555")],
                  relief=[("pressed", "flat"), ("!pressed", "flat")])

    def _create_widgets(self, parent):
        """Creates and arranges all the UI widgets with enhanced layout."""
        
        # --- Header Section ---
        header_frame = ttk.Frame(parent)
        header_frame.grid(row=0, column=0, sticky=(tk.W, tk.E), pady=(0, 20))
        header_frame.columnconfigure(1, weight=1)

        # Try to load and display logo
        if self._load_logo():
            logo_label = ttk.Label(header_frame, image=self.logo_image, background="#0f0f0f")
            logo_label.grid(row=0, column=0, padx=(0, 15))

        # Title
        title_frame = ttk.Frame(header_frame)
        title_frame.grid(row=0, column=1, sticky=(tk.W, tk.E))
        
        title_label = ttk.Label(title_frame, text="FlightGrimoire", style="Title.TLabel")
        title_label.pack(anchor="w")
        
        subtitle_label = ttk.Label(title_frame, text="Serial Data Logger & UBX Processor", 
                                   background="#0f0f0f", foreground="#888888", 
                                   font=("Segoe UI", 8))
        subtitle_label.pack(anchor="w")

        # --- Configuration Section ---
        config_frame = ttk.LabelFrame(parent, text="Connection", padding="0")
        config_frame.grid(row=1, column=0, sticky=(tk.W, tk.E), pady=(0, 15))
        config_frame.columnconfigure(1, weight=1)

        # COM Port row
        ttk.Label(config_frame, text="COM Port:", style="TLabel").grid(row=0, column=0, padx=(0, 10), pady=8, sticky="e")
        
        port_frame = ttk.Frame(config_frame)
        port_frame.grid(row=0, column=1, sticky=(tk.W, tk.E), pady=8)
        port_frame.columnconfigure(0, weight=1)
        
        self.port_var = tk.StringVar()
        self.port_combo = ttk.Combobox(port_frame, textvariable=self.port_var, width=25, state='readonly')
        self.port_combo.grid(row=0, column=0, sticky=(tk.W, tk.E), padx=(0, 10))
        
        self.refresh_button = ttk.Button(port_frame, text="Refresh", command=self.populate_com_ports, 
                                         style="Refresh.TButton", width=7)
        self.refresh_button.grid(row=0, column=1)

        # Baud Rate row
        ttk.Label(config_frame, text="Baud Rate:", style="TLabel").grid(row=1, column=0, padx=(0, 10), pady=8, sticky="e")
        
        self.baud_var = tk.StringVar()
        baud_rates = ['9600', '19200', '38400', '57600', '115200', '230400', '460800', '921600']
        self.baud_combo = ttk.Combobox(config_frame, textvariable=self.baud_var, values=baud_rates, 
                                       width=25, state='readonly')
        self.baud_combo.set('115200')
        self.baud_combo.grid(row=1, column=1, sticky=(tk.W, tk.E), pady=8)

        # --- Control Section ---
        control_frame = ttk.Frame(parent)
        control_frame.grid(row=2, column=0, pady=(0, 15), sticky="ew")
        control_frame.columnconfigure(0, weight=1)
        control_frame.columnconfigure(1, weight=1)

        self.start_button = ttk.Button(control_frame, text="Start", command=self.start_logging, 
                                       style="Start.TButton")
        self.start_button.grid(row=0, column=0, padx=(0, 8), sticky="ew")

        self.stop_button = ttk.Button(control_frame, text="Stop", command=self.stop_logging, 
                                      state=tk.DISABLED, style="Stop.TButton")
        self.stop_button.grid(row=0, column=1, padx=(8, 0), sticky="ew")

        # --- Processing Section ---
        process_frame = ttk.Frame(parent)
        process_frame.grid(row=3, column=0, pady=(0, 15), sticky="ew")
        process_frame.columnconfigure(0, weight=1)
        process_frame.columnconfigure(1, weight=1)

        self.process_latest_button = ttk.Button(process_frame, text="Process Latest", 
                                                command=self.process_latest_file, style="Process.TButton",
                                                state=tk.DISABLED)
        self.process_latest_button.grid(row=0, column=0, padx=(0, 8), sticky="ew")
        
        self.process_custom_button = ttk.Button(process_frame, text="Select Capture", 
                                                command=self.process_custom_file, style="CustomProcess.TButton")
        self.process_custom_button.grid(row=0, column=1, padx=(8, 0), sticky="ew")

        # --- Output Folder Section ---
        folder_frame = ttk.Frame(parent)
        folder_frame.grid(row=4, column=0, pady=(0, 15), sticky="ew")
        folder_frame.columnconfigure(0, weight=1)
        
        # Set initial button text to show current folder
        initial_text = f"📁 {self.output_folder}"
        if len(initial_text) > 60:  # Truncate very long paths
            initial_text = f"📁 ...{self.output_folder[-50:]}"
        
        self.folder_button = ttk.Button(folder_frame, text=initial_text, 
                                        command=self.select_output_folder, style="Folder.TButton")
        self.folder_button.grid(row=0, column=0, sticky="ew")

        # --- Status Section ---
        status_frame = ttk.LabelFrame(parent, text="Status", padding="0")
        status_frame.grid(row=5, column=0, sticky=(tk.W, tk.E))
        
        # Status grid layout
        status_content = ttk.Frame(status_frame)
        status_content.pack(fill="x")
        status_content.columnconfigure(1, weight=1)
        
        # Data size
        ttk.Label(status_content, text="Total Size:", style="TLabel").grid(row=0, column=0, sticky="w", padx=(0, 10), pady=3)
        self.size_var = tk.StringVar(value="0 B")
        ttk.Label(status_content, textvariable=self.size_var, style="Status.TLabel").grid(row=0, column=1, sticky="w", pady=3)

        # Data rate
        ttk.Label(status_content, text="Data Rate:", style="TLabel").grid(row=1, column=0, sticky="w", padx=(0, 10), pady=3)
        self.rate_var = tk.StringVar(value="0 B/s")
        ttk.Label(status_content, textvariable=self.rate_var, style="Status.TLabel").grid(row=1, column=1, sticky="w", pady=3)

        # Current file
        ttk.Label(status_content, text="File:", style="TLabel").grid(row=2, column=0, sticky="w", padx=(0, 10), pady=3)
        self.file_status_var = tk.StringVar(value="No file recorded yet")
        self.file_status_label = ttk.Label(status_content, textvariable=self.file_status_var, style="TLabel")
        self.file_status_label.grid(row=2, column=1, sticky="w", pady=3)

    def select_output_folder(self):
        """Open folder selection dialog and update the button text."""
        folder = filedialog.askdirectory(
            title="Select Output Folder",
            initialdir=self.output_folder
        )
        
        if folder:  # User selected a folder (didn't cancel)
            self.output_folder = folder
            
            # Update button text with the selected folder path
            folder_text = f"📁 {self.output_folder}"
            
            # Truncate very long paths for display
            if len(folder_text) > 60:
                folder_text = f"📁 ...{self.output_folder[-50:]}"
            
            self.folder_button.config(text=folder_text)

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
        
        # Generate filename from current date and time, save to selected output folder
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"log_{timestamp}.ubx"
        self.current_filename = os.path.join(self.output_folder, filename)

        try:
            self.ser = serial.Serial(port, baudrate=baud, timeout=0.1)
        except serial.SerialException as e:
            messagebox.showerror("Serial Error", f"Failed to open port '{port}':\n{e}")
            return

        try:
            # Ensure the output directory exists.
            os.makedirs(self.output_folder, exist_ok=True)
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
        self.start_button.config(state=tk.DISABLED, text="Recording...")
        self.stop_button.config(state=tk.NORMAL)
        self.port_combo.config(state=tk.DISABLED)
        self.baud_combo.config(state=tk.DISABLED)
        self.refresh_button.config(state=tk.DISABLED)
        
        # Update file status with success styling
        self.file_status_var.set(f"📝 {os.path.basename(self.current_filename)}")
        self.file_status_label.configure(style="Success.TLabel")
        
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
        self.rate_var.set("0 B/s")
        self.start_button.config(state=tk.NORMAL, text="Start")
        self.stop_button.config(state=tk.DISABLED)
        self.port_combo.config(state='readonly')
        self.baud_combo.config(state='readonly')
        self.refresh_button.config(state=tk.NORMAL)
        
        # Enable process button if we have a file
        if self.current_filename and os.path.exists(self.current_filename):
            self.process_latest_button.config(state=tk.NORMAL)
            self.file_status_var.set(f"✅ {os.path.basename(self.current_filename)}")
            self.file_status_label.configure(style="Success.TLabel")

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
        self.size_var.set(f"{self._format_bytes(self.total_bytes)}")
        self.rate_var.set(f"{self._format_bytes(self.data_rate)}/s")
        
        # Schedule the next update in 1sec
        self.root.after(1000, self.update_gui_status)

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
            messagebox.showerror("Parser Error", 
                                 "HPPOSLLH_to_CSV.py not found or could not be imported.\n"
                                 "Please ensure the parser file is in the same directory.")
            return
        
        try:
            # Generate output filename in the same directory as the input file
            base_name = os.path.splitext(filename)[0]
            output_filename = f"{base_name}.csv"
            
            # Show processing message
            self.file_status_var.set(f"⏳ Processing {os.path.basename(filename)}...")
            self.file_status_label.configure(style="Warning.TLabel")
            self.root.update()
            
            # Call the parser
            if hasattr(HPPOSLLH_to_CSV, 'process_file_to_csv'):
                HPPOSLLH_to_CSV.process_file_to_csv(filename, output_filename)
                
                # This now updates the status for ANY successfully processed file
                self.file_status_var.set(f"✅ {os.path.basename(filename)} 🡺 CSV")
                self.file_status_label.configure(style="Success.TLabel")
                
                messagebox.showinfo("Processing Complete", 
                                    f"UBX file successfully converted to CSV!\n\n"
                                    f"Output: {os.path.basename(output_filename)}")
            else:
                messagebox.showerror("Parser Error", 
                                     "Parser function 'process_file_to_csv' not found in HPPOSLLH_to_CSV.py.")
                
        except Exception as e:
            # Reset status on error
            if self.current_filename:
                self.file_status_var.set(f"✅ {os.path.basename(self.current_filename)}")
                self.file_status_label.configure(style="Success.TLabel")
            
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
    
    # Center the window on screen
    root.withdraw()  # Hide window temporarily
    root.update_idletasks()  # Update "requested size" from geometry manager
    
    # Calculate position for centering
    x = (root.winfo_screenwidth() // 2) - (500 // 2)  # Approximate window width
    y = (root.winfo_screenheight() // 2) - (650 // 2)  # Increased window height for new button
    root.geometry(f"+{x}+{y}")
    
    root.deiconify()  # Show window
    
    app = SerialReaderApp(root)
    root.mainloop()