/**
 * Created by mradojewski on 13.03.2017.
 */
var express = require('express');
var middleware = require('./middleware');
var app = middleware(express());

module.exports = function(bookRepository) {

    var routes = require('./routes')(bookRepository);
    app.get('/', app.myLogger, routes.helloWord);
    app.post('/stock', app.myLogger, routes.stockUp);
    app.get('/stock', app.myLogger, routes.findAll);
    app.get('/stock/:isbn', app.myLogger, routes.getStock);
    app.get('/err', app.myLogger, routes.error);
    app.get('/*', app.myLogger, routes.clientError);

    return app;

};
