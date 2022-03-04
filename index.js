const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./src/routes");

dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Content-Length, Authorization, X-Requested-With, X-XSRF-TOKEN"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use("/", router);

app.use(function(req, res, next) {
  res.status(404);
  // default to plain-text. send()
  res.send("Requested API route not found");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + process.env.PORT);
});