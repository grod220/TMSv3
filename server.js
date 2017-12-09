const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const enforce = require("./enforceSSL");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static(path.resolve(__dirname, "./react-ui/build")));

app.use("/api", require("./api"));

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "./react-ui/build", "index.html"));
});

app.listen(PORT, function() {
  console.log(`Meatballs listening on port ${PORT}! ♪♩♫♯♭`);
});
