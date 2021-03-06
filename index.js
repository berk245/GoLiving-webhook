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

app.get("/", function(req, res) {
  res.send(
    "Welcome to the GoLiving Webhook! There is nothing to see here. You can apply for a room by filling in this form:" +
      "https://berkozzambak.typeform.com/to/pTfYSQ"
  );
});

app.use(bodyParser.json());

const applicationSchema = new mongoose.Schema({
  name: String,
  date: String,
  room: String,
  image: String
});

const newApplication = mongoose.model("newApplication", applicationSchema);

app.post("/webhook", async (req, res) => {
  const relevantData = req.body.form_response.answers;
  const newMember = new newApplication({
    name: relevantData[0].text,
    date: relevantData[1].date,
    room: relevantData[2].choice.label,
    image: "https://evisatraveller.mfa.ir/static/images/help/no-scan.jpg"
  });
  await newMember.save();
  res.status(200).send(newMember);
});

const port = process.env.PORT || 5000;
//start the listening

app.listen(port, () => {
  console.log("We are live on port:" + port + "!");
});
