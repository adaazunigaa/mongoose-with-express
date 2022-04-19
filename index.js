const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Mongo connection OPEN!");
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR" + err);
    });


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




app.get("/", (req, res)=>{
    res.send("<h1>main</h1>")
})



app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})