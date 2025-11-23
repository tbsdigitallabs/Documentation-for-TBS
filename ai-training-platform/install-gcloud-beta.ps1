# Install Google Cloud SDK Beta Component
# Run this script in PowerShell or CMD

Write-Host "Installing gcloud beta component..." -ForegroundColor Green

# For PowerShell, use this:
& gcloud components install beta

# Alternative: If the above doesn't work, run this in CMD:
# gcloud components install beta

Write-Host "`nBeta component installation complete!" -ForegroundColor Green
Write-Host "You can now use: gcloud beta run domain-mappings" -ForegroundColor Cyan

