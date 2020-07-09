cd /d %PLAYSMART_PATH%\Engine
node ./editorservice/StartService.js --publish
echo %~dp0 |clip
exit