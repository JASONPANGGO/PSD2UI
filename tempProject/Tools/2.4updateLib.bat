@echo off
::ɾ�������ļ�
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start

cd ..
::ɾ��
rd /s /q Scripts\libs
::�����ļ�����Ŀ��
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\libs  Scripts\libs /E

