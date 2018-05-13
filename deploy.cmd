git add .
SET /P msg=commit message :
git commit -m "%msg%"
git push heroku master

