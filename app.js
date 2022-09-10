const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose, Schema } = require("mongoose");
const date = require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB-solo");

const todoSchema = {
  item: String,
};

const listSchema = {
  name: String,
  items: [todoSchema],
};

const ListItem = mongoose.model("Item", todoSchema);

const List = mongoose.model("List", listSchema);

const defaultList = [
  new ListItem({ item: "This is a to do list!" }),
  new ListItem({ item: "Add items with the +" }),
  new ListItem({ item: "Hit the checkbox to delete" }),
];

app.get("/", function (req, res) {
  List.findOne({ name: "ToDo-List" }, (err, list) => {
    if (!list) {
      const newList = {
        name: "ToDo-List",
        items: defaultList,
      };

      List.create(newList, (err, doc) => {
        if (!err) {
          console.log("Default load success!");
        }
      });

      setTimeout(() => res.redirect("/"), 100);
    } else {
      res.render("index", { title: list.name, myItems: list.items });
    }
  });
});

app.get("/:customList", (req, res) => {
  listName = _.capitalize(req.params.customList);

  List.findOne({ name: listName }, (err, list) => {
    if (!list) {
      const newList = {
        name: listName,
        items: defaultList,
      };

      List.create(newList, (err, doc) => {
        if (!err) {
          console.log("List load success!");
        }
      });

      setTimeout(() => res.redirect("/" + listName), 100);
    } else {
      res.render("index", { title: listName, myItems: list.items });
    }
  });
});

app.post("/", function (req, res) {
  const listName = req.body.listName;
  const newItem = new ListItem({ item: req.body.addItem });

  List.findOne({ name: listName }, (err, list) => {
    if (list) {
      list.items.push(newItem);
      list.save();
    }
  });

  if (listName != "ToDo-List") {
    res.redirect("/" + listName);
  } else {
    res.redirect("/");
  }
});

app.post("/delete", function (req, res) {
  const listName = req.body.listName;
  const listItem = req.body.listItem;

  List.findOneAndUpdate(
    { name: listName },
    { $pull: { items: { _id: listItem } } },
    (err) => {
      if (!err) {
        console.log("item removed");
      }
    }
  );

  if (listName != "ToDo-List") {
    res.redirect("/" + listName);
  } else {
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
