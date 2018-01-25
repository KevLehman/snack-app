var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  mongoose = require("mongoose"),
  Snack = require("./api/models/appModel"),
  bodyParser = require("body-parser");
  
mongoose.connect("mongodb://kaleman:Kestar1234@ds161304.mlab.com:61304/snackapp");
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var routes = require("./api/routes/appRoutes");  
routes(app);
app.listen(port);

console.log('REST API server started on: ' + port);