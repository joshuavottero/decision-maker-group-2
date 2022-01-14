# Midterm Project : Decision-maker App

## Features
* Users can login with email
* Users can create as many polls as they'd like, check the results, and delete
* Polls will be stored for each user based on their email
* Users can add a title and as many voting choices/description as they desire (as well as remove them)
* When the new poll is made, the app will email 2 links (mailgun) to the creator (a results link and a link where friends can vote)
* Users, when voting, can drag and drop their choices into the ranking order they choose and submit
* The results are displayed in a bar chart and pie chart using Google API
* The results are calculated using Borda Method
* Multi-page app

## Stretch
* After voting, pollers can check the results of the poll
* Animation apis
* Use styled alert pop-up boxes for submitting forms
* Counting how many people voted
* Expiration date and status of poll
* Character limit for option descriptions




#Dependencies
   "chalk": "^2.4.2",
    "cookie-parser": "^1.4.6",
    "cookie-session": "^2.0.0",
    "dotenv": "^2.0.0",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "form-data": "^4.0.0",
    "mailgun": "^0.5.0",
    "mailgun-js": "^0.22.0",
    "morgan": "^1.9.1",
    "pg": "^8.5.0",
    "pg-native": "^3.0.0",
    "sass": "^1.47.0"
