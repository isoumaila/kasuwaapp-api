//libs
const express = require("express");
const dataBase = require('./models/configs/db');
const testRoute = require('./controllers/routes/tests_routes');
const magazinRoute = require('./controllers/routes/magazinsRoutes');
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');

//instanciations des libs
const app = express();
//Middleware
app.use(bodyParser.json());

//definitions des options de swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Employee API",
            version: "1.0.0",
            license: {
                name: "MIT",
                url: "http://example.com",
            },
            description: "API desctiption",
            contact: {
                name: "contact name",
                url: "http://example.com",
                email: "test@test.com",
            },
            termsOfService: "http://example.com",
        },
        host: "localhost:777/", // Host (optional)
        basePath: "k-api/v1", // Base path (optional)
    },
    apis: ["./controllers/routes/tests_routes.js", "./controllers/routes/magazinsRoutes.js"],

};

// injection des Midlwares dans l'application
app.use(express.static("public"));
/* Manage CORS Access for ALL requests/responses */
app.use(function(req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});
app.use('/k-api/v1', testRoute);
app.use('/k-api/v1', magazinRoute);
app.set("view engine", "ejs");

//swagger configuration
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//appel à la page d'aceuil de l'API
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
})

//configuration des ports de l'application
const server = app.listen(process.env.PORT || 777, () => {
    const port = server.address().port;
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});