const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

const db = require('./config/db');

app.set('view engine', 'ejs');

app.set("views",path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());

app.use("/",require("./routes/adminRoutes"));

db();

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is Running on port : ${port}`);
})