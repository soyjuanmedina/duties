const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var cors = require('cors')
var ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('listening on ' + port)
});

MongoClient.connect('mongodb+srv://admin:1234@cluster0.nxbvq1x.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  db = client.db('dutiesDB')
  collection = db.collection('duty')
})

app.get('/duty', (req, res) => {
  db.collection('duty').find().toArray()
    .then(results => {
      res.json(results);
    }).catch(error => console.error(error));
})

app.post('/duty', (req, res) => {
  collection.insertOne(req.body)
    .then(result => {
      res.json(true);
    })
    .catch(error => console.error('error', duty))
})

app.put('/duty/:id', (req, res) => {
  collection.findOneAndUpdate(
    { "_id": ObjectId(req.params.id) },
    {
      $set: {
        name: req.body.name
      }
    },
    {
      upsert: true
    }
  ).then(result => { res.json('Updated') })
    .catch(error => console.error(error))
});

app.delete('/duty/:id', (req, res) => {
  collection.deleteOne(
    { "_id": ObjectId(req.params.id) }
  )
    .then(result => {
      res.json(true);
    })
    .catch(error => console.error(error))
})