const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//Connect to database
mongoose.connect(
  "mongodb+srv://newUser:123new@cluster0-oixaf.gcp.mongodb.net/GoLiving?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const relevantData = req.body.form_response.answers;
  const newMember = {
    name: relevantData[0].text,
    date: relevantData[1].date,
    room: relevantData[2].choice.label
  };
  await newMember.save();
  res.status(200).send(newCustomer);
});

const port = process.env.PORT || 5000;
//start the listening

app.listen(port, () => {
  console.log("We are live on port:" + port + "!");
});
