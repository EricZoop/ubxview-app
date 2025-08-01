$portName   = "COM4"
$baudRate   = 115200
$outputFile = "output.ubx"

$parity     = [System.IO.Ports.Parity]::None
$dataBits   = 8
$stopBits   = [System.IO.Ports.StopBits]::One

$port = New-Object System.IO.Ports.SerialPort($portName, $baudRate, $parity, $dataBits, $stopBits)

try {
    $port.Open()
    Write-Host "Successfully opened port '$portName'."

    while ($true) {
        if ($port.BytesToRead -gt 0) {
            try {
                $data = $port.ReadLine().TrimEnd("`r", "`n")  # Remove newline chars
                Write-Output $data
                Add-Content -Path $outputFile -Value $data
            }
            catch {
                Write-Warning "An error occurred while reading or writing data: $_"
            }
        }
        Start-Sleep -Milliseconds 10
    }
}
catch {
    $errorMessage = $_.Exception.Message
    Write-Error "A critical error occurred: $errorMessage"
    Write-Error "Please ensure the port name ('$portName') is correct and not in use by another application."
}
finally {
    if ($port -and $port.IsOpen) {
        Write-Host "Closing port '$portName'..."
        $port.Close()
        Write-Host "Port closed."
    }
    if ($port) {
        $port.Dispose()
    }
    Write-Host "Script finished."
}
