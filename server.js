/**requiring express */
const express = require('express'); //creates an express application
const bodyParser = require('body-parser'); //handling html form
const app = express(); //this is an object that denotes the ex app
const MongoClient = require('mongodb').MongoClient; // for using mongodb
const objectMo = require('mongodb').ObjectID; // for using mongodb
const assert = require('assert');

//set the view engine
app.set('view-engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json());
//this is to handle the form express does not
app.use(bodyParser.urlencoded({extended: true}));

var db;
MongoClient.connect('mongodb://ankit:locked@ds149059.mlab.com:49059/contacts', (err, database) => {
    if (err)
        return console.log(err);

    //render
    db = database;
    /** start a unix socket an listen for connections  */
    app.listen(3000, function() {
        console.log("listening on port 3000");
    });

});

//send response
app.get('/', (req, res) => {
    db.collection('record').find().toArray((err, results) => {
        if (err)
            return console.log(err);
        console.log(results);
        res.render('index.ejs', {record: results})
    });

});

//post
app.post('/record', (req, res) => {
    console.log(req.body);
    db.collection('record').save(req.body, (err, results) => {
        if (err)
            return console.log(err);

        console.log("saved to database");
        res.redirect('/');
    })
});

app.put('/update', (req, res) => {
    let id = req.body._id;
    let change = {
        name: req.body.name,
        telephone: req.body.telephone,
        gridRadios: req.body.gridRadios
    }
    db.collection('record', (err, collection) => {
        collection.updateOne({
            "_id": objectMo(id)
        }, {
            $set: change
        }, function(err, r) {
            // db.close();
        });

    })
});

//delete
app.delete("/delete", (req, res) => {
    db.collection('record', (err,collection)=>{
      collection.remove({"_id": objectMo(req.body._id)})
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));

    })
})
