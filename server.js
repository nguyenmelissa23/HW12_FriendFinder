// Your server.js file should require the basic npm packages we've used in class: express, body-parser and path.

// This file make the connection with the server and listen for any request from the url:

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Routers: How to respond when there is a resquest:
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//Listening to any request which is from the URL
app.listen(PORT, function(){
    console.log("Listening on Port: " + PORT + ". http://localhost:" + PORT);
});