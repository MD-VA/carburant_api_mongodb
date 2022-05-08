//Receive data from JSON POST and insert into MongoDB

const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
let db;
//Establish Connection
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
   if (err) 
   	throw err
   else
   {
	db = client.db('carburant');;
	console.log('Connected to MongoDB');
	//Start app only after connection is ready
	app.listen(3000);
   }
 });

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/data/data.json'));
});

app.post('/', function(req, res) {
    fs.readFile(path.join(__dirname, '/data/data.json'), 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        var json = JSON.parse(data);
    
        db.collection('carb2').insert(json, function (err, result) {
            if (err)
               res.send('Error');
            else
              res.send('Success');
      
        });
    });
// p
});
