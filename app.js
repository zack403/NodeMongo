var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/dbmongo");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    choice: String,
    phone: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.send("hi there....");
});

app.use(express.static('public'));

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Record saved to database");
        })
        .catch(err => {
            res.status(400).send("error while saving to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});