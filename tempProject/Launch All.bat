::ɾ��Scripts�µĴ���
del /f /q /a Scripts\*.js
del /f /q /a Scripts\*.map
del /f /q /a Scripts\*.meta
::�Զ�����
start tsc --watch
::��VSCODE
start code .
::������
cd /d %PLAYSMART_PATH%\Engine
node ./editorservice/StartService.js --publish

exit