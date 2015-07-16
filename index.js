var express = require("express"),
    exphbs = require("express-handlebars"),
    mysql = require("mysql"),
    bodyParser = require("body-parser"),
    myConnection = require("express-myconnection"),
    spaza = require("./routes/spaza");    
    products = require("./routes/crud");
    products = require("./routes/spaza");
    categories = require("./routes/spaza");
    addCategories = require("./routes/categories");
    sales = require("./routes/spaza");
        
var app = express();

var dbOptions = {
        host : "localhost",
        user : "root",
        password : "amila",
        port : 3306,
        database : "sakonwaba"
};

app.engine("handlebars", exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

// allows you to use mysql from the http request
app.use(myConnection(mysql, dbOptions, "single"));

//gives the request the ability to handle form parameters
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())


//app.get("/",products.show);
app.get("/products", products.showProductList);


//app.get("/products",products.show)
//app.get("/products/edit/:id", products.get);
//app.post("/products/update/:id", products.update);
//app.post("/products/add/:id", products.add);
//app.get("/products/delete/:id", products.delete);

app.get("/popular_products", spaza.showpopularPdt);
app.get("/least_products", spaza.showleastPdt);
//app.get("/products/edit/:id", products.get);
//app.post("/products/update/:id", products.update);
//app.post("/products/add/:id", products.add);
//app.get("/products/delete/:id", products.delete);

//app.get("/categories", categories.show);

//shows categories from spaza.js function
app.get("/categories", spaza.showcategories);

//add categories from categories.js functions and also show them

app.get("/addCategory", addCategories.show);
app.get("/addCategory/edit/:id", addCategories.get);
app.post("/addCategory/add", addCategories.add)
app.post("/addCategory/update/:id", addCategories.update);
app.get("/addCategory/delete/:id", addCategories.delete);

app.get("/popular_category",spaza.showmostPopCat);
app.get("/least_category",spaza.showleastPopCat);
//app.get("/products/edit/:id", products.get);
//app.post("/products/update/:id", products.update);
//app.post("/products/add/:id", products.add);
//app.get("/products/delete/:id", products.delete);

app.get("/product_earnings",spaza.showearningsPerPdt);
app.get("/profitable_product",spaza.showmostProfPdt);
//app.get("/products/edit/:id", products.get);
//app.post("/products/update/:id", products.update);
//app.post("/products/add/:id", products.add);
//app.get("/products/delete/:id", products.delete);

//app.get();

app.get("/",function (req, res){
res.render("index");
 });


   var port = process.env.PORT || 8080;       
   //start the server
var server = app.listen(port, function () {
var host = server.address().address;
var port = server.address().port;
console.log('Example app listening at http://%s:%s', host, port);
});

