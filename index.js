const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override")

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
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"]

app.get("/", (req, res)=>{
    res.send("<h1>main</h1>")
});

app.get("/products", async (req,res)=>{
    const products = await Product.find({});
    res.render("products/index.ejs", {products});
});

app.get("/products/new", (req,res)=>{
    res.render("products/new.ejs", {categories});
});

app.post("/products", async (req,res) =>{
    const newProduct = new Product(req.body);
    await newProduct.save();
    // console.log(newProduct)
    res.redirect("/products");
});

app.get("/products/:id", async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/show.ejs", { product })
})


app.get("/products/:id/edit", async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit.ejs", {product, categories});
});

app.put("/products/:id", async(req,res)=>{
    // console.log(req.body);
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
});

app.delete("/products/:id", async (req,res)=>{
    // res.send("DELETE")
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect("/products")
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
})