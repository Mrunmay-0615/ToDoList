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

app.get("/", function(req, res){
  res.send("Hello!!");
});

app.listen(port, function() {
  console.log("Server started on port 3000");
});
