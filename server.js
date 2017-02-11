/**requiring express */
const express = require('express'); //creates an express application
const bodyParser = require('body-parser'); //handling html form
const app = express(); //this is an object that denotes the ex app
const MongoClient = require('mongodb').MongoClient; // for using mongodb

var db;
MongoClient.connect('mongodb://ankit:locked@ds149059.mlab.com:49059/contacts', (err, database) => {
    if (err) return console.log(err);
    //render
    db = database;
    /** start a unix socket an listen for connections  */
    app.listen(3000, function() {
        console.log("listening on port 3000");
    });

});

//set the view engine
app.set('view-engine', 'ejs');
//this is to handle the form express does not
app.use(bodyParser.urlencoded({
    extended: true
}));

//send response
app.get('/', (req, res) => {
    db.collection('record').find().toArray((err,results) => {
      if(err) return console.log(err);
      res.render('index.ejs', {record: results})
    });
});

app.post('/record', (req, res) => {
    console.log(req.body);
    db.collection('record').save(req.body,(err,results) => {
      if(err) return console.log(err);

      console.log("saved to database");
      res.redirect('/');
    })
});
