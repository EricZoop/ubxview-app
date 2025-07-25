#
# readcom_NavHPPOSLLH.ps1
#
# This script reads a serial COM port for u-blox UBX messages, specifically
# looking for the NAV-HPPOSLLH message (High Precision Position in Lat/Lon/Height).
# When found, it parses the message and outputs the data to both the console
# and a custom NMEA-like text file.
#

# --- Configuration ---
$portName   = "COM3"
$baudRate   = 115200
$outputFile = "hpposllh_data.txt" # Changed from .csv to .txt

$parity     = [System.IO.Ports.Parity]::None
$dataBits   = 8
$stopBits   = [System.IO.Ports.StopBits]::One

# --- Script Initialization ---
$port = New-Object System.IO.Ports.SerialPort($portName, $baudRate, $parity, $dataBits, $stopBits)
$port.ReadTimeout = 1000

# Buffer for building UBX messages
$ubxBuffer = @()
$inUbxMessage = $false
$expectedLength = 0
$currentLength = 0

# --- Functions ---

function Write-HexDump {
    param([byte[]]$data, [string]$prefix = "")

    $hex = ($data | ForEach-Object { $_.ToString("X2") }) -join " "
    $ascii = -join ($data | ForEach-Object {
        if ($_ -ge 32 -and $_ -le 126) { [char]$_ } else { "." }
    })
    Write-Host "$prefix$hex  $ascii"
}

function Parse-UBX-Message {
    param([byte[]]$message)

    if ($message.Length -lt 8) { return }

    $class = $message[2]
    $id = $message[3]
    $length = [BitConverter]::ToUInt16($message, 4)  # Little endian

    Write-Host "`n=== UBX Message ===" -ForegroundColor Green
    Write-Host "Class: 0x$($class.ToString('X2')) ($class)"
    Write-Host "ID: 0x$($id.ToString('X2')) ($id)"
    Write-Host "Length: $length bytes"

    # Check if this is NAV-HPPOSLLH (Class=0x01, ID=0x14)
    if ($class -eq 0x01 -and $id -eq 0x14) {
        Write-Host "*** NAV-HPPOSLLH Message Found! ***" -ForegroundColor Yellow
        Parse-HPPOSLLH -data $message
    } else {
        Write-Host "Other UBX message: Class=0x$($class.ToString('X2')), ID=0x$($id.ToString('X2'))"
    }
}

function Parse-HPPOSLLH {
    param([byte[]]$data)

    if ($data.Length -lt 42) {
        Write-Host "HPPOSLLH message too short" -ForegroundColor Red
        return
    }

    # Extract payload (skip header, class, id, length)
    $payload = $data[6..($data.Length-3)]  # Exclude checksum

    $iTOW = [BitConverter]::ToUInt32($payload, 4)
    $lon = [BitConverter]::ToInt32($payload, 8)
    $lat = [BitConverter]::ToInt32($payload, 12)
    $height = [BitConverter]::ToInt32($payload, 16)
    $hMSL = [BitConverter]::ToInt32($payload, 20)
    # Convert unsigned bytes to signed bytes properly
    $lonHp = if ($payload[24] -gt 127) { $payload[24] - 256 } else { $payload[24] }
    $latHp = if ($payload[25] -gt 127) { $payload[25] - 256 } else { $payload[25] }
    $heightHp = if ($payload[26] -gt 127) { $payload[26] - 256 } else { $payload[26] }
    $hMSLHp = if ($payload[27] -gt 127) { $payload[27] - 256 } else { $payload[27] }
    $hAcc = [BitConverter]::ToUInt32($payload, 28)
    $vAcc = [BitConverter]::ToUInt32($payload, 32)

    # --- CALCULATIONS ---
    $lonDeg = ($lon * 1e-7) + ($lonHp * 1e-9)
    $latDeg = ($lat * 1e-7) + ($latHp * 1e-9)
    $heightM = ($height * 1e-3) + (($heightHp * 0.1) * 1e-3) # Height is mm + 0.1mm components
    $hMSLM = ($hMSL * 1e-3) + (($hMSLHp * 0.1) * 1e-3)   # hMSL is mm + 0.1mm components
    $hAccM = $hAcc * 1e-4 # Accuracy is 0.1mm units -> meters
    $vAccM = $vAcc * 1e-4 # Accuracy is 0.1mm units -> meters

    # Get current timestamp for console display
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss.fff"

    # Write to console
    Write-Host "--- HPPOSLLH Decoded ---" -ForegroundColor Cyan
    Write-Host "Time: $timestamp"
    Write-Host "iTOW: $iTOW ms"
    Write-Host "Latitude: $($latDeg.ToString('F9'))°"
    Write-Host "Longitude: $($lonDeg.ToString('F9'))°"
    Write-Host "Height (ellipsoid): $($heightM.ToString('F4')) m"
    Write-Host "Height (MSL): $($hMSLM.ToString('F4')) m"
    Write-Host "Horizontal Accuracy: $($hAccM.ToString('F4')) m"
    Write-Host "Vertical Accuracy: $($vAccM.ToString('F4')) m"
    Write-Host "------------------------" -ForegroundColor Cyan

    # *** MODIFIED PART: Format output as a custom string and write to file ***
    try {
        # Create the custom sentence string: $HPPOSLLH,lat,lon,iTOW,height,hMSL,hAcc,vAcc
        $outputSentence = '$HPPOSLLH,' + $($latDeg.ToString('F9')) + ',' + $($lonDeg.ToString('F9')) + ',' + $iTOW + ',' + $($heightM.ToString('F4')) + ',' + $($hMSLM.ToString('F4')) + ',' + $($hAccM.ToString('F4')) + ',' + $($vAccM.ToString('F4'))
        Add-Content -Path $script:outputFile -Value $outputSentence -ErrorAction Stop
    }
    catch {
        Write-Host "Error writing to file: $_" -ForegroundColor Red
    }
}

# --- Main Execution Block ---
try {
    $port.Open()
    Write-Host "Successfully opened port '$portName' for binary reading."
    Write-Host "Listening for UBX NAV-HPPOSLLH messages... Press Ctrl+C to stop."
    Write-Host "Data will be saved to '$outputFile'"

    # CSV header creation has been removed as it is no longer needed.

    $messageCount = 0

    while ($true) {
        if ($port.BytesToRead -gt 0) {
            try {
                # Read available bytes
                $buffer = New-Object byte[] $port.BytesToRead
                $bytesRead = $port.Read($buffer, 0, $buffer.Length)

                # Process each byte for UBX message detection
                foreach ($byte in $buffer[0..($bytesRead-1)]) {

                    if (-not $inUbxMessage) {
                        # Look for UBX sync bytes (0xB5 0x62)
                        if ($ubxBuffer.Count -eq 0 -and $byte -eq 0xB5) {
                            $ubxBuffer += $byte
                        }
                        elseif ($ubxBuffer.Count -eq 1 -and $byte -eq 0x62) {
                            $ubxBuffer += $byte
                            $inUbxMessage = $true
                            $currentLength = 2
                        }
                        else {
                            $ubxBuffer = @() # Reset if first byte isn't 0xB5
                        }
                    }
                    else {
                        # We're in a UBX message, collect bytes
                        $ubxBuffer += $byte
                        $currentLength++

                        # Once we have the header and length bytes (6 bytes total)
                        if ($currentLength -eq 6) {
                            $expectedLength = [BitConverter]::ToUInt16($ubxBuffer[4..5], 0) + 8  # Payload Length + Header (6) + Checksum (2)
                        }

                        # Check if the complete message has been received
                        if ($currentLength -ge 2 -and $currentLength -ge $expectedLength) {
                            # A complete message is received, process it
                            if ($ubxBuffer[2] -eq 0x01 -and $ubxBuffer[3] -eq 0x14) {
                                $messageCount++
                                Write-Host "`n--- Message #$messageCount ---" -ForegroundColor Green
                                Parse-UBX-Message -message $ubxBuffer
                            }

                            # Reset for the next message
                            $ubxBuffer = @()
                            $inUbxMessage = $false
                            $expectedLength = 0
                            $currentLength = 0
                        }
                    }
                }
            }
            catch {
                Write-Warning "An error occurred while reading data: $_"
            }
        }
        Start-Sleep -Milliseconds 10 # A small sleep to prevent tight-looping and high CPU usage
    }
}
catch {
    $errorMessage = $_.Exception.Message
    Write-Error "A critical error occurred: $errorMessage"
}
finally {
    if ($port -and $port.IsOpen) {
        Write-Host "`nClosing port '$portName'..."
        $port.Close()
        Write-Host "Port closed."
    }
    if ($port) {
        $port.Dispose()
    }
    if ($messageCount -gt 0) {
        Write-Host "Captured $messageCount HPPOSLLH messages to: $outputFile" -ForegroundColor Green
    }
    Write-Host "Script finished."
}