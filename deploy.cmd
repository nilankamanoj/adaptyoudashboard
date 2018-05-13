git add .
:Orig
SET /P msg = commit message :
git commit -m ECHO %msg%
git push heroku master

