# Drop Haiku 🖊️

Drop haiku is an api service that allows a user to fetch a haiku out of random. These are mostly cute, romantic and a little cringe in nature.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Try the api here

https://drop-message.onrender.com/api/messages

You may experience certain lag as cold starts usually take 50 seconds

## Installation

    1. Clone the repo
    2. Execute npm i
    3. Create a .env file and povide values mentioned in .env.example
    3. Execute npm run dev

    If you want to run the build version them simply

    1. Execute npm run build
    2. Execute npm start

## APIs

Get All Available Haikus

```
curl --location 'http://localhost:3000/api/messages'
```

Get a random Haiku

```
curl --location 'http://localhost:3000/api/messages/random-message'
```

Get a Haiku based on Id

```
curl --location 'http://localhost:3000/api/messages/{HAIKU_ID}'
```

Like/Dislike a Haiku

```
curl --location 'http://localhost:3000/api/messages/like-dislike-message' \
--header 'Content-Type: application/json' \
--data '{
    "id": {HAIKU_ID},
    "type": "liked" | "disliked",
    "value": true | false
}'
```

Made by Angad Sudesh Srivastav
