# Url Shortener Microservice

This is a simple application that can create and access short url from a parameter url.

# Example 

Create: 
```
https://rtapan-url-shortener.herokuapp.com/new/https://facebook.com

```
Response:
```
{"original-url":"https://www.facebook.com","short_url":"https://rtapan-url-shortener/29"}
```

Access: 
```
https://rtapan-url-shortener.herokuapp.com/29

```
Redirect to:
```
https://www.facebook.com
```

# Prerequisites

In order to use this app, you must have the following installed:

- [Node.js](https://nodejs.org/)
- [NPM](https://nodejs.org/)
- [MongoDB](http://www.mongodb.org/)

### Local Environment Variables

Create a file named `.env` in the root directory. This file should contain:

```
MONGO_URI=mongodb://localhost:27017/clementinejs
PORT=8080
APP_URL=http://localhost:8080/
```

# Starting the App

To start the app, make sure you're in the project directory and type `node server.js` into the terminal. This will start the Node server and connect to MongoDB.

You should the following messages within the terminal window:

```
Node.js listening on port 8080...
```

Next, open your browser and enter `http://localhost:8080/`. Congrats, you're up and running!

# License

MIT License. [Click here for more information.](LICENSE.md)
