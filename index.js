const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();

//Connect to database
mongoose.connect(
  "mongodb+srv://newUser:123new@cluster0-oixaf.gcp.mongodb.net/GoLiving?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
//start the listening

app.listen(port, () => {
  console.log("We are live on port:" + port + "!");
});
