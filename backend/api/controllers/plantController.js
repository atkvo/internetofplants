'use strict';

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