//libs
const express = require("express");
const dataBase = require('./models/configs/db');
const testRoute = require('./controllers/routes/tests_routes');
const bodyParser = require("body-parser");




//instanciations des libs
const app = express();
//Middleware
app.use(bodyParser.json());
app.use('/postMessages', testRoute);


//routes
app.listen(777, () => {
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});