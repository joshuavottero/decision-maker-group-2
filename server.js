// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");


// mailgun
// const apiKey = process.env.API_KEY;
// const DOMAIN = process.env.DOMAIN;
// const formData = require('form-data');
// const Mailgun = require('mailgun-js');
// const mailgun = new Mailgun(formData);
// const client = mailgun.client({username: 'api', key: API_KEY});
const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

//
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ['email']
})
);
app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const pollsRoutes = require("./routes/polls");
const pollsVoteRoute = require("./routes/polls-vote");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
// app.use("/polls", pollsRoutes(db));
app.use("/polls", pollsRoutes(db,mailgun));
app.use("/polls", pollsVoteRoute(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
