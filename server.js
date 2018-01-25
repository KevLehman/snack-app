var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require("mongoose"),
  Snack = require("./api/models/appModel"),
  bodyParser = require("body-parser");
  
mongoose.connect("mongodb://localhost/SnackApp");
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require("./api/routes/appRoutes");  
routes(app);
app.listen(port);

console.log('REST API server started on: ' + port);