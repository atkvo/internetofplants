'use strict';

var sqlite3 = require('sqlite3').verbose();
var planter = require('./plantpinger.js');

var dbName = 'plantdata.db'
var db = new sqlite3.Database(dbName);

var numUpdating = 0;

db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        // console.log(row.id + ": " + row.info);
    });
});

function parseNodeResponse(raw) {
    var list = raw.split("\n").filter(function (v) { return v !== "" }).map(Number);
    for(let i = 0; i < list.length; i++) {
        console.log(i + ': ' + list[i]);
    }
}

exports.getStuff = function() {
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
}

exports.updateNodes = function() {
    var availNodes = [ 'Node0', 'Node1' ];

    if (numUpdating == 0) {
        var timeoutInterval = 4000; // 4 seconds 
        numUpdating = availNodes.length;

        for (let i = 0; i < availNodes.length; i++) {
            setTimeout(function () {
                planter.pingNode(availNodes[i], (val) => { parseNodeResponse(val); });
                numUpdating--;
            }, timeoutInterval * i);
        }
    }
}
