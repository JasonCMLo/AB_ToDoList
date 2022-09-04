const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Cook food", "Eat Food"];
var workItems = [];

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
  res.render("index", { title: dateFormatted, myItems: items });
});

app.get("/work", function (req, res) {
  res.render("index", { title: "Work", myItems: workItems });
});

app.post("/", function (req, res) {
  let newItem = req.body.addItem;

  if (req.body.button === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    items.push(newItem);

    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
