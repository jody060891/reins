@ECHO OFF

set DOTNETFX2=%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319
set PATH=%PATH%;%DOTNETFX2%

echo Uninstalling HITS Incident Checker Service...
echo ---------------------------------------------------
InstallUtil /u CheckIncidentWinService.exe
echo ---------------------------------------------------
echo Done.