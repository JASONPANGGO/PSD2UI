::version_5.0
@echo off&setlocal EnableDelayedExpansion

cd..
set lj=%cd%
set lj=%lj:\= %
for %%a in (%lj%) do set pack_name=%%a
cd Build
set release_path=%cd%

rd /q /s %pack_name%
ROBOCOPY PublishProject %pack_name% /E
del %pack_name%\folder.ignore
cd %pack_name%
rename StartGame.html %pack_name%.html

del js\game-scripts-debug*.* /f/s/q/a
cd..

del %pack_name%.zip
"C:\Program Files\Bandizip\Bandizip.exe" a "%pack_name%.zip" "%pack_name%"