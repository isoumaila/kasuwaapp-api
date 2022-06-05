//libs
const express = require("express");
//const low = require("lowdb");
//const FileSync = require("lowdb/adapters/FileSync");
//const { join } = require("path");
//const docs = require('./docs');
const dataBase = require('./models/configs/db');
const testRoute = require('./controllers/routes/tests_routes');
const bodyParser = require("body-parser");
//const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const expressJSDocSwagger = require("express-jsdoc-swagger");
//const swaggerDocument = require("./swagger.json");



//instanciations des libs
const app = express();
//Middleware
app.use(bodyParser.json());


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
    apis: ["./controllers/routes/tests_routes.js"],

};

// use the express-static middleware
app.use(express.static("public"));
app.use('/k-api/v1', testRoute);
app.set("view engine", "ejs");
//swagger
//expressJSDocSwagger(app)(swaggerOptions);
const swaggerDocs = swaggerJSDoc(swaggerOptions);
//const swaggerDocsServer = swaggerJSDoc(swaggerServer);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


//routes
const server = app.listen(process.env.PORT || 777, () => {
    const port = server.address().port;
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});