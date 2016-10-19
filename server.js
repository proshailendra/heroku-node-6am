var express = require("express"),
    bodyParser = require("body-parser"),
    expressSession = require("express-session"),
    path = require("path"),
    apiRoutes = require("./server/routes/api.routes"),
    webRoutes = require("./server/routes/web.routes");

var app = express();

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));

//application/json
app.use(bodyParser.json());
//www-form-data
app.use(bodyParser.urlencoded({ extended: false }));

//angular app
app.use(express.static("./app"));
//packages
app.use(express.static("./node_modules"));

//routes
app.use("/", webRoutes); //angular app
app.use("/api", apiRoutes); //express api
//angular html5mode fixing
app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/index.html"));
});

var port = process.env.PORT || 1301;
app.listen(port, function() {
    console.log("Server is running at http://localhost:" + port);
});