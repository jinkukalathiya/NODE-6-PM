const express = require('express');

const cookieParser = require('cookie-parser');

const port = 8000;

const app = express();

app.use(cookieParser());

app.use(express.urlencoded());

app.get('/set-cookie', (req, res) => {
    res.cookie("username","Jinkal", {
        maxAge : 1000 * 60 * 10,
        httpOnly : true
    })
    res.send("Cookie Has been Send...!");
})

app.get('/get-cookie', (req, res) => {
    const user = req.cookies.username;
    res.send("User Name is " + user);
});

app.get('/delete-cookie', (req, res) => {
    res.clearCookie("username");
    res.send("Cookie Deleted...!");
});

app.listen(port, (err) => {
    if(err){
        console.log("Server Not Start...!");
    }
    console.log("Server Start on http://localhost:8000");
});