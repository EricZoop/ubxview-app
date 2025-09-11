$portName   = "COM3"
$baudRate   = 115200
$outputFile = "data.ubx"

$parity     = [System.IO.Ports.Parity]::None
$dataBits   = 8
$stopBits   = [System.IO.Ports.StopBits]::One

$port = New-Object System.IO.Ports.SerialPort($portName, $baudRate, $parity, $dataBits, $stopBits)

# Set timeout for read operations (in milliseconds)
$port.ReadTimeout = 100

try {
    $port.Open()
    Write-Host "Successfully opened port '$portName'."
    
    # Open file stream with FileShare.Read to allow other processes to read while writing
    $fileStream = [System.IO.File]::Open($outputFile, [System.IO.FileMode]::Create, 
                                        [System.IO.FileAccess]::Write, 
                                        [System.IO.FileShare]::Read)
    Write-Host "Created output file '$outputFile' (readable while writing)."

    $totalBytesRead = 0

    Write-Host "Reading binary data... Press Ctrl+C to stop."
    
    while ($true) {
        if ($port.BytesToRead -gt 0) {
            try {
                # Read one byte at a time for immediate writing
                $byte = $port.ReadByte()
                
                if ($byte -ne -1) {
                    # Write byte immediately and flush to ensure it's available for reading
                    $fileStream.WriteByte([byte]$byte)
                    $fileStream.Flush()  # This ensures data is immediately available to other processes
                    
                    $totalBytesRead++
                    if ($totalBytesRead % 100 -eq 0) {  # Update display every 100 bytes
                        Write-Host "Total bytes: $totalBytesRead" -NoNewline
                        Write-Host "`r" -NoNewline
                    }
                }
            }
            catch [System.TimeoutException] {
                # Timeout is expected when no data is available, continue
            }
            catch {
                Write-Warning "An error occurred while reading or writing data: $_"
            }
        }
        Start-Sleep -Milliseconds 1  # Very short sleep to prevent CPU spinning
    }
}
catch {
    $errorMessage = $_.Exception.Message
    Write-Error "A critical error occurred: $errorMessage"
    Write-Error "Please ensure the port name ('$portName') is correct and not in use by another application."
}
finally {
    # Close file stream first
    if ($fileStream) {
        Write-Host "`nClosing output file..."
        $fileStream.Close()
        $fileStream.Dispose()
    }
    
    # Then close serial port
    if ($port -and $port.IsOpen) {
        Write-Host "Closing port '$portName'..."
        $port.Close()
        Write-Host "Port closed."
    }
    if ($port) {
        $port.Dispose()
    }
    Write-Host "Script finished. Total bytes written: $totalBytesRead"
}