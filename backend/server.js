'use strict';
var path = require('path');
var plantModel = require('./api/models/plantModel');
var pollRate = 1500; // Attempt to poll every 1500ms

global.appRoot = path.resolve(__dirname);

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../frontend/dist'));

var routes = require('./api/routes/plantRoutes');

setInterval(function() {
    plantModel.updateNodes();
}, pollRate);

routes(app);
app.listen(port);
