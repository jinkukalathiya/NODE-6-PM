const express = require('express');

const session = require('express-session');

const passport = require('./config/passport');

const port = 9000;

const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.urlencoded())

app.use(
    session({
        secret : "passportsecret",
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize());

app.use(passport.session());

app.use('/', require('./routes/authRoutes'));

app.listen(port, (err) => {
    if(err){
        console.log("Server Not Start...!");
    }
    else{
        console.log("Server Start on http://localhost:9000");
    }
})