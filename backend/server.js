'use strict';
var path = require('path');
var plantModel = require('./api/models/plantModel');

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
}, 1500);

routes(app);
app.listen(port);
