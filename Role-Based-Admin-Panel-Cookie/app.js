const express = require('express');

const cookieParser = require('cookie-parser');

const port = 8000;

const connectDB = require('./config/db');

connectDB();

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(cookieParser('secretKey1234'));

const authRoutes = require('./routes/authRoutes');

app.use('/',authRoutes);


app.listen(port, (err) => {
    if(err){
        console.log("Error in Server Start");
    }
    console.log("Server Start on http://localhost:8000");
})