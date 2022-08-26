require("dotenv").config();
const express = require("express");
const dataBase = require('./models/configs/db');
const testRoute = require('./controllers/routes/tests_routes');
const magazinRoute = require('./controllers/routes/magazinsRoutes');
const userRoute = require('./controllers/routes/userController');
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');
const http = require("http");
const appConf = require("./app");
//const servers = http.createServer(app);
//instanciations des libs
const app = express();
const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

//login configuration


//routers
var aboutRouter = require('./app_server/routes/aboutRouter');
var indexRouter = require("./app_server/routes/indexRouter");
var boutiquesRouter = require("./app_server/routes/boutiquesRouter");
var usersRouter = require("./app_server/routes/usersRouter");


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
        tags: [{
                name: 'shops',
                description: 'Shop API'
            },
            {
                name: 'messages',
                description: 'Messages API'
            }
        ],
        host: "localhost:777/", // Host (optional)
        basePath: "k-api/v1", // Base path (optional)
    },
    apis: ["./controllers/routes/tests_routes.js", "./controllers/routes/magazinsRoutes.js"],

};

// injection des Midlwares dans l'application
app.use(express.static("public"));
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.use('/boutiques/images/', express.static(__dirname + '/images'));
/* Manage CORS Access for ALL requests/responses */
app.use(function(req, res, next) {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    const token = localStorage.getItem("ourToken");
    console.log("ffhfhhh");
    console.log(token);
    res.setHeader('x-access-token', token);
    req.header('x-access-token', token);
    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});
app.use('/k-api/v1', testRoute);
app.use('/k-api/v1', magazinRoute);
app.use('/k-api/v1', userRoute);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app_server', 'views'));

//swagger configuration
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/', boutiquesRouter);
app.use('/', usersRouter);



//configuration des ports de l'application
const server = app.listen(process.env.PORT || 777, () => {
    const port = server.address().port;
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});