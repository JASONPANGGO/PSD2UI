@echo off
::ɾ�������ļ�
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start

cd ..
::ɾ��
rd /s /q Scripts\custom\component
rd /s /q Scripts\custom\tween
::�����ļ�����Ŀ��
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\custom\component Scripts\custom\component /E
ROBOCOPY %PLAYSMART_PATH%\output\Scripts\custom\tween Scripts\custom\tween /E
ROBOCOPY %PLAYSMART_PATH%\output\Editor Editor /E