'use strict';

var model = require('../models/plantModel');

function getFakePlants () {
    var samplePlants = [
        {
            id: 0,
            name: 'Fern',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            id: 1,
            name: 'AirPlant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            id: 2,
            name: 'Room Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            id: 3,
            name: 'Frontdoor Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        }
    ];
    return samplePlants;
}

exports.getPlants = function (req, res) {
    model.getAvailableNodes(function (nodes) {
        res.json(nodes);
    });
    // res.json(model);
};

exports.addPlant = function (req, res) {
    if (req.body.NodeID !== undefined) {
        var plantName = req.body.PlantName === undefined ? '' : req.body.PlantName;
        model.addPlantNode(req.body.NodeID, req.body.PlantName, (err) => {
            if (err) {
                res.json(Object.assign(req.body, err));
            } else {
                res.json(Object.assign(req.body, { AddStatus: 'OK' }));
            }
        });
    }
}

exports.updatePlantName = function (req, res) {
    if (req.body.NodeID !== undefined) {
        var plantName = req.body.PlantName === undefined ? '' : req.body.PlantName;
        model.updatePlantName(req.body.NodeID, req.body.PlantName, (err) => {
            if (err) {
                res.json(Object.assign(req.body, err));
            } else {
                res.json(Object.assign(req.body, { UpdateStatus: 'OK' }));
            }
        });
    }
}

exports.getPlantDataPoint = function (req, res) {
    console.log(req.query)
    if (req.query.NodeID !== undefined) {
        model.getPlantDataPoint(req.query.NodeID, (data) => {
            res.json(data);
        });
    }
}

exports.getPlantHistory = function (req, res) {
    if (req.query.NodeID !== undefined) {
        model.getPlantDataHistory(req.query.NodeID, (data) => {
            res.json(data);
        });
    }
}
// exports.addFakes = function (req, res) {
//     model.parseNodeResponse("Node1", "44\n55\n66\n88\n");
// }
