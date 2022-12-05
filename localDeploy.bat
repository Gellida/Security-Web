@ECHO OFF
IF NOT EXIST ".env" (
    COPY example.env .env
    npm install
) ELSE (
    COPY .env env.txt
    MOVE env.txt bin
    COPY example.env example.txt
    MOVE example.txt bin
    ts-node bin/env-managment.ts
    CD bin
    DEL example.txt
    DEL env.txt
    CD ./
    PAUSE
    npm install
)
