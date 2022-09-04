const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Tell Wincy you love her", "Kiss Wincy"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let dateFormatted = today.toLocaleDateString("En-US", options);
  res.render("index", { myDate: dateFormatted, myItems: items });
});

app.post("/", function (req, res) {
  var newItem = req.body.addItem;

  items.push(newItem);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
