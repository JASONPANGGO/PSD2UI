@echo off
::删除多余文件
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start
::复制文件到项目里
cd ..
rd /s /q Scripts\custom
rd /s /q Scripts\libs
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\custom  Scripts\custom /E
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\libs  Scripts\libs /E
