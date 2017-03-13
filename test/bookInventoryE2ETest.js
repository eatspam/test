/**
 * Created by mradojewski on 13.03.2017.
 */
var request = require('supertest');
var express = require('express');

var app = require('../bookInventoryApp');

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
            .expect({ isbn: 'ABCD', count: 667 })
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
    })
})



