@echo off
REM Install Google Cloud SDK Beta Component
REM Run this script in CMD

echo Installing gcloud beta component...

REM Set up Python environment
FOR /F "delims=" %%i in ('""%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"" components copy-bundled-python') DO (
    SET CLOUDSDK_PYTHON=%%i
)

REM Install beta component
gcloud components install beta

echo.
echo Beta component installation complete!
echo You can now use: gcloud beta run domain-mappings
pause

