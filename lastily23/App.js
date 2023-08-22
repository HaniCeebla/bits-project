const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const expresslayouts=require('express-ejs-layouts')
const { render } = require("ejs");
const App = express();



App.listen(7000);
console.log("use port 7000");



App.use(bodyparser.urlencoded({ extended: true }));




App.use(express.static("public"));
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lastly23",
});
con.connect((err) => {
  if (err) throw err;
  console.log("connected");
});








App.get("/", (req, res) => {
  res.render("login");
});

App.get("/table", (req, res) => {
  const tb = `create table products (id int primary key, Name varchar(20) ,
 Auther varchar(20), Price float(10),Sell_price float(10), sawir text)`;
  con.query(tb, (err) => {
    if (err) throw err;
    console.log("table created");
  });
  res.send("table created");
});



//getting insert table 

App.get("/insert", (req, res) => {
  const inser = `insert into products values('5','iphone 13','rag', 
'250','200','three.jpeg')`;
  con.query(inser, (err, reslt) => {
    if (err) throw err;
    console.log("data inserted");
  });
  res.send("data inserted");
});
//select
App.get("/home", (req, res) => {
  const hel = "select * from products";
  con.query(hel, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.render("home", { data: data });
  });
});





App.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sel = "select * from users where userName = ? and password = ?";
  con.query(sel, [username, password], (err, result) => {
    if (err) {
      console.log("wrong password or username");
      return;
    }
    if (result.length > 0) {
      res.redirect("/home");
    } else {
      console.log("incorrect passwor or username");
      res.render("login");
    }
  });
});

// App.get('/home',(req,res)=>{
//     res.render('home')
//      })
App.get("/Register", (req, res) => {
  res.render("Register");
});






App.post("/Register", (req, res) => {
  const { fullName, userName, Email, Password } = req.body;
  const sql =
    "insert into users (fullName,userName,Email,password) values(?,?,?,?)";
  con.query(sql, [fullName, userName, Email, Password], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/");
  });
});
// App.get("/Register", (req, res) => {
//   res.render("about");
// });





// Engine for view ejs start here ?

App.set("view engine", "ejs");
// App.use(expresslayouts)
// App.set('layout','./layout/weblayout')


// ends ehere 
App.get("/about", (req, res) => {
  res.render("about");
});
App.get("/products", (req, res) => {
  res.render("products");
});
App.get("/contact", (req, res) => {
  res.render("contact");
});
App.get("/single-product", (req, res) => {
  res.render("single-product");
});

// App.get('/new',(req,res)=>{
//     res.render('index',)
// })
