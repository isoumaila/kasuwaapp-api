const express = require("express");
const dataBase = require('./models/configs/db');
const testRoute = require('./controllers/routes/tests_routes');
const magazinRoute = require('./controllers/routes/magazinsRoutes');
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

//routers
var aboutRouter = require('./app_server/routes/aboutRouter');
var indexRouter = require("./app_server/routes/indexRouter");
var boutiquesRouter = require("./app_server/routes/boutiquesRouter")

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

    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});
app.use('/k-api/v1', testRoute);
app.use('/k-api/v1', magazinRoute);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'app_server', 'views'));

//swagger configuration
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/', boutiquesRouter);

var emitter = require('events').EventEmitter;

var em = new emitter();
em.addListener('nav .nav-link', function() {
    console.log('First subscriber: ');
});
em.on('nav .nav-link', function() {
    console.log('First subscriber: ');
});

//configuration des ports de l'application
const server = app.listen(process.env.PORT || 777, () => {
    const port = server.address().port;
    console.log("[kasuwa-app-api]---- server started : ok ----------");
    console.log("[kasuwa-app-api]---- server listen at port : 777 --");
});