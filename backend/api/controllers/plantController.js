'use strict';

var model = require('../models/plantModel');

function getFakePlants() {
    var samplePlants = [
        {
            name: 'Fern',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            name: 'AirPlant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            name: 'Room Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        },
        {
            name: 'Frontdoor Plant',
            temperature: '40c',
            humidity: '39',
            lightLevel: '85%',
            soilMoisture: '85%'
        }
    ];
    return samplePlants;
}

exports.getPlants = function(req, res) {
    res.json(getFakePlants());
};

exports.addPlant = function(req, res) {
    // console.log(req.body);
    console.log(model.getStuff());
    res.json(req.body);
}