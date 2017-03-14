/**
 * Created by mradojewski on 13.03.2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/bookInventory';


var collection = MongoClient.connect(url, {
    bufferMaxEntries: 0
}).then(function(db) {
    return db.collection('books');
});

var findAll = function() {
    return collection.then(function(collection) {
        return collection.find({}).toArray();
    });
};

var stockUp = function(book) {
    return collection.then(function(collection) {
        return collection.updateOne({isbn: book.isbn}, book, {upsert: true});
    });
};

var getStock = function(isbn) {
    return collection.then(function(collection) {
        return collection.find({"isbn": isbn}).limit(1).next();
    });
};

module.exports = function() {
    return {
        findAll: findAll,
        stockUp: stockUp,
        getStock: getStock
    };
};