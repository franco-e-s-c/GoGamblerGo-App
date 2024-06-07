for /F "tokens=1,* delims==" %%a in (config.txt) do (
    if "%%a"=="PG_BIN" set PG_BIN=%%b
    if "%%a"=="PG_RES" set PG_RES=%%b
    if "%%a"=="DB_NAME" set DB_NAME=%%b
    if "%%a"=="USER" set USER=%%b
    if "%%a"=="PGPASSWORD" set PGPASSWORD=%%b
    if "%%a"=="HOST" set HOST=%%b
    if "%%a"=="PORT" set PORT=%%b
)
set SQL_FILE=gggprueba.sql

%PG_BIN% -U %USER% -d postgres -h %HOST% -p %PORT% -c "CREATE DATABASE %DB_NAME%;"

%PG_RES% -v --no-owner -U %USER% -d %DB_NAME% -h %HOST% -p %PORT% -F c %SQL_FILE%
pause