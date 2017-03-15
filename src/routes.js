/**
 * Created by mradojewski on 14.03.2017.
 */
module.exports = function(bookRepository) {
    return {
        helloWord: function (req, res) {
            res.send('Hello World dupa!');
        },

        stockUp: function (req, res, next) {
            var book = {};
            book.isbn = req.body.isbn;
            book.count = req.body.count;
            bookRepository.stockUp(book).then(function () {
                res.json(book);
            }).catch(next);
        },

        getStock:  function (req, res, next) {
            bookRepository.getStock(req.params.isbn).then(function (doc) {
                if (doc) {
                    res.format({

                        'text/html': function(){
                            res.send('<p>items left' + doc.count + '</p>');
                        },

                        'application/json': function() {
                            res.send(200, doc.count);
                        },

                        'default': function() {
                            // log the request and respond with 406
                            res.status(406).send('Not Acceptable');
                        }
                    });

                } else {
                    res.status(404).send('item not found');
                }
            }).catch(next);
        },

        findAll: function (req, res, next) {
            bookRepository.findAll().then(function (docs) {
                res.json(docs);
            }).catch(next);
        },

        error: function (req, res) {
            throw 'ERROR';
        },

        clientError: function (req, res) {
            res.status(404).send('Client error!');
        }
    }
};