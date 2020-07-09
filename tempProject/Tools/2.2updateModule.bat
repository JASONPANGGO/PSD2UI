@echo off
::删除多余文件
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start

cd ..
::删除
rd /s /q Scripts\custom\module
::复制文件到项目里
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\custom\module Scripts\custom\module /E
