::删除Scripts下的代码
del /f /q /a Scripts\*.js
del /f /q /a Scripts\*.map
del /f /q /a Scripts\*.meta
::自动编译
start tsc --watch
::打开VSCODE
start code .
::打开引擎
cd /d %PLAYSMART_PATH%\Engine
node ./editorservice/StartService.js --publish

exit