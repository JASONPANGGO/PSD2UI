@echo off
::删除多余文件
del /f /s /q /a %PLAYSMART_PATH%\output\TypeScripts\*.meta
rd /s /q %PLAYSMART_PATH%\output\Scripts\start

cd ..
set /p file_path=请输入请输入要更新的文件路径,根目录为Scripts\custom\（例如：component\Behaviour):
::删除
del /s /q Scripts\custom\%file_path%.d.ts
del /s /q Scripts\custom\%file_path%.js
::复制文件到项目里
copy %PLAYSMART_PATH%\output\Scripts\custom\%file_path%.d.ts Scripts\custom\%file_path%.d.ts /E
copy %PLAYSMART_PATH%\output\Scripts\custom\%file_path%.js Scripts\custom\%file_path%.js /E
pause