'use strict';

module.exports = function(app) {
    var iop = require('../controllers/plantController');

    app.route('/plants') 
        .get(iop.getPlants)
        .post(iop.addPlant);

    app.route('/plants/updatename') 
        .post(iop.updatePlantName);

    app.route('/plants/currentdata') 
        .get(iop.getPlantDataPoint);

    app.route('/plants/history')
        .get(iop.getPlantHistory);
};