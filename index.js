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
const server = app.listen(process.env.PORT || 777, () => {
    const port = server.address().port;
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});