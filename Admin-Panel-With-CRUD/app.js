const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

app.set('view engine', 'ejs');

app.set("views",path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded());

app.use("/",require("./routes/adminRoutes"));

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is Running on port : ${port}`);
})