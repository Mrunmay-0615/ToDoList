//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-Mrunmay:Prabhakar@cluster0.lsgootn.mongodb.net/toDoListDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
}); 

const Item = mongoose.model("Item", itemSchema);

const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to your To-Do-List!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res){
  Item.find({}, function(err, items){
    if(err){
      console.log(err);
    }
    else{
      if (items.length===0){
        Item.insertMany(defaultItems, function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added default items.");
          }
        });
      }
      res.render("list", {listTitle: "Today", newListItems: items});
    }
  });
});

app.post("/", function(req, res){

  const listName = req.body.list;
  const newItem = new Item({
    name: req.body.newItem
  });

  if (listName==="Today"){
    Item.insertMany([newItem], function(err){
      if(err){console.log(err);}
      else {console.log("Successfully added new item.");}
    });
    res.redirect("/");
  }
  else{
    List.findOne({name:listName}, function(err, result){
      result.items.push(newItem);
      result.save(); 
      res.redirect("/" + listName);
    });
  }
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});
