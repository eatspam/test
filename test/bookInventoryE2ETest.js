/**
 * Created by mradojewski on 13.03.2017.
 */
var request = require('supertest');
var express = require('express');
var bookRepository = require('./inMemoryBookRepository')();

var app = require('../src/bookInventoryApp')(bookRepository);

describe('My App', function() {

    it('should generally work', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });

    it('should support POST', function(done) {
        request(app)
            .post('/stock')
            .send({ isbn: 'ABCD', count: 666 })
           // .expect('Content-Type', /json/)
           // .expect(200)
            .expect({ isbn: 'ABCD', count: 666 })
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    });

    it('should return count of items', function(done) {
        bookRepository._items([{ isbn: 'Test666', count: 20 }]);
        request(app)
            .get('/stock/Test666')
            .set('Accept','application/json')
            .expect(200, '20', done);
    });
})



