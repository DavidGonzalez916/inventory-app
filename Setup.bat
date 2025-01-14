@echo off

call npm audit
echo Do you wish to fix the Vulnerabilities available
set /p fix=
if /i "%fix%"=="Yes" call npm audit fix

call npm run seed
START npm run server-dev
START npm run client-dev
