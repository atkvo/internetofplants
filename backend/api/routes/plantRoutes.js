'use strict';

module.exports = function(app) {
    var iop = require('../controllers/plantController');

    app.route('/plants') 
        .get(iop.getPlants)
        .post(iop.addPlant);
};