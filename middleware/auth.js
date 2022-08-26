const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const app = express();
const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const config = process.env;
app.use(function(req, res, next) {
    const token = localStorage.getItem("ourToken");
    console.log("ffhfhhh");
    console.log(token);
    res.setHeader('x-access-token', token);
    req.header('x-access-token', token);
    next();
});

const verifyToken = (req, res, next) => {
    //const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("AUTH AUTH");
    token = localStorage.getItem("ourToken");
    if (!token) {
        //return res.status(403).send("A token is required for authentication");
        //res.status(200).send("A token is required for authentication");
        redirect("/auth/loginget", res);
    }
    try {
        const decoded = jwt.verify(token, "" + config.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
    } catch (err) {
        //return res.status(401).send("Invalid Token");
        //res.status(200).send("Invalid Token");
        redirect("/auth/loginget", res);
    }
    return next();
};

function redirect(url, res) {
    res.statusCode = 302;
    res.header('Location', url);
    res.setHeader('x-access-token', "ggggg");
    // return res;
}
module.exports = verifyToken;