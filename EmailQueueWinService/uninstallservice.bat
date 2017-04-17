@ECHO OFF

set DOTNETFX2=%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319
set PATH=%PATH%;%DOTNETFX2%

echo Uninstalling HITS Email Queue Service...
echo ---------------------------------------------------
InstallUtil /u EmailQueueWinService.exe
echo ---------------------------------------------------
echo Done.