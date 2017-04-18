'use strict';

var sqlite3 = require('sqlite3').verbose();
var planter = require('./plantpinger.js');

var dbName = 'plantdata.db'
var db = new sqlite3.Database(dbName);

var numUpdating = 0;


db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS PlantNodes \
                (\
                  NodeID text UNIQUE,\
                  PlantName text,\
                  ID INTEGER PRIMARY KEY ASC\
                );"
    );

    db.run("CREATE TABLE IF NOT EXISTS PlantData \
                ( \
                  ID INTEGER, \
                  Light INTEGER, \
                  Moisture INTEGER, \
                  Humidity INTEGER, \
                  Temperature INTEGER, \
                  Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, \
                  FOREIGN KEY(ID) REFERENCES PlantNodes(ID) \
                );"
    );
});


function createPlantObject(nodeID) {
    var plant = {
        NodeID: nodeID,
        PlantName: "",
        // Light: 0,
        // Moisture: 0,
        // Humidity: 0,
        // Temperature: 0,
        DataHistory: []
    };

    return plant;
}

function parseNodeResponse (nodeID, raw) {
    if (raw === undefined) {
        return;
    }

    var list = raw.split("\n").filter(function (v) { return v !== "" }).map(Number);
    var plant = createPlantObject(nodeID);

    if (list.length >= 4) {
        plant.Light = list[0];
        plant.Moisture = list[1];
        plant.Humidity = list[2];
        plant.Temperature = list[3];

        insertPlantData(plant);
    }

}

function insertPlantData (plant) {
    db.all("SELECT ID from PlantNodes WHERE nodeID == (?)", plant.NodeID, (err, row) => {
        if (err) {
            console.log("error getting plantID");
        } else if (row.length > 0) {
            let id = row[0].ID;
            console.log("ID ok: ", id)
            db.run("INSERT INTO PlantData (ID, Light, Moisture, Humidity, Temperature) VALUES (?, ? ,?, ?, ?)",
                id, plant.Light, plant.Moisture, plant.Humidity, plant.Temperature);
        } else {
            console.log("Plant NodeID doesn't exist yet");
            addPlantNode(plant.NodeID, "Unnamed");
            insertPlantData(plant);
        }
    });
}

function addPlantNode (nodeID, plantName, cb) {
    db.run("INSERT INTO PlantNodes (NodeID, PlantName) VALUES (?, ?)",
        nodeID, plantName, cb);
}

exports.addPlantNode = function (nodeID, plantName, cb) {
    addPlantNode(nodeID, plantName, cb);
}

exports.updatePlantName = function (nodeID, plantName, cb) {
    db.run("UPDATE PlantNodes \
        SET PlantName = (?) \
        WHERE NodeID == (?)",
        plantName, nodeID, cb);
}

// Callback is called with array parameter:
//      [
//        {
//          NodeID: '',
//          PlantName: '',
//          ID: 0
//        }
//      ]
exports.getAvailableNodes = function (cb) {
    db.all("SELECT * from PlantNodes", function(err, row) {
        if (err) {
            console.log(err);
        } else {
            cb(row);
        }
    });
}

// Callback is called with object:
//  {
//      NodeID: '',
//      PlantName: '',
//      Light: 0,
//      Moisture: 0,
//      Temperature: 0,
//      Timestamp: ''
//  }
exports.getPlantDataPoint = function (nodeID, cb) {
    var plant = createPlantObject(nodeID);
    db.all("SELECT * from PlantNodes WHERE nodeID == (?)", plant.NodeID, function (err, row) {
        if (err) {
            console.log("error getting plantID");
        } else if (row.length > 0) {
            let id = row[0].ID;
            plant.PlantName = row[0].PlantName;
            db.all("SELECT * FROM PlantData WHERE ID = (?) ORDER BY Timestamp DESC", id, (err, row) => {
                cb(Object.assign(plant, row[0]));
            });
        }
    });
}

// Callback is called with object:
//    {
//      NodeID: '',
//      PlantName: '',
//      DataHistory: 
//      [
//          {
//              Light: 0,
//              Moisture: 0,
//              Temperature: 0,
//              Timestamp: ''
//          }
//      ]
//    }
exports.getPlantDataHistory = function (nodeID, cb) {
    var plant = createPlantObject(nodeID);
    db.all("SELECT * from PlantNodes WHERE nodeID == (?)", plant.NodeID, function (err, row) {
        if (err) {
            console.log("error getting plantID");
        } else if (row.length > 0) {
            let id = row[0].ID;
            plant.PlantName = row[0].PlantName;
            db.each("SELECT * FROM PlantData WHERE ID = (?)", id,
                (err, row) => {
                    console.log(row);
                    var datapoint = {
                        Light: row.Light,
                        Moisture: row.Moisture,
                        Humidity: row.Humidity,
                        Temperature: row.Temperature,
                        Timestamp: row.Timestamp,
                    };
                    plant.DataHistory.push(datapoint);
                }, 
                (err, row) => {
                    cb(plant);
                }
            );
        }
    });
}

exports.updateNodes = function () {
    var availNodes = [ 'Node0', 'Node1' ];

    if (numUpdating == 0) {
        var timeoutInterval = 4000; // 4 seconds 
        numUpdating = availNodes.length;

        for (let i = 0; i < availNodes.length; i++) {
            setTimeout(function () {
                planter.pingNode(availNodes[i], (val) => { parseNodeResponse(availNodes[i], val); });
                numUpdating--;
            }, timeoutInterval * i);
        }
    }
}
