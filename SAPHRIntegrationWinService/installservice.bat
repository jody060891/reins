@ECHO OFF

set DOTNETFX2=%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319
set PATH=%PATH%;%DOTNETFX2%

echo Installing HITS SAP Integration Service...
echo ---------------------------------------------------
InstallUtil /i SAPHRIntegrationWinService.exe
echo ---------------------------------------------------
echo Done.