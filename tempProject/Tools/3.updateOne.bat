@echo off
::ɾ�������ļ�
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start

cd ..
set /p file_path=������������Ҫ���µ��ļ�·��,��Ŀ¼ΪScripts\custom\�����磺component\Behaviour):
::ɾ��
del /s /q Scripts\custom\%file_path%.d.ts
del /s /q Scripts\custom\%file_path%.js
::�����ļ�����Ŀ��
copy %PLAYSMART_PATH%\output\Scripts\custom\%file_path%.d.ts Scripts\custom\%file_path%.d.ts /E
copy %PLAYSMART_PATH%\output\Scripts\custom\%file_path%.js Scripts\custom\%file_path%.js /E
pause