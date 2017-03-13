/**
 * Created by mradojewski on 13.03.2017.
 */
var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/bookInventory';


app.use(bodyParser.json());
var collection = MongoClient.connect(url).then(function(db) {
    return db.collection('books');
});

function logger(req, res, next) {
    console.log("GET request", new Date());
    next();
}

app.use(function (err, req, res, next) {
    console.error(err.stack)
    if (err.statusCode === 500) {
        res.status(500).send('Server error!');
    }
    next(err);
});

app.get('/', logger, function (req, res) {
    res.send('Hello World dupa!')
});

app.post('/stock', logger, function (req, res) {
    var book = {}
    book.isbn = req.body.isbn;
    book.count = req.body.count;
    collection.then(function (collection) {
        return collection.updateOne({isbn: book.isbn}, book, {upsert: true});
    }).then(function() {
        res.json(book);
    });
});

app.get('/stock', logger, function (req, res) {
    collection.then(function (collection) {
        return collection.find({}).toArray();
    }).then(function(docs) {
        res.json(docs);
    });
});

app.get('/err', logger, function (req, res) {
    throw 'ERROR';
});

app.get('/*', logger, function (req, res) {
    res.status(404).send('Client error!');
});

module.exports = app;