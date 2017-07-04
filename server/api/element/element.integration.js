'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newElement;

describe('Element API:', function() {
  describe('GET /api/elements', function() {
    var elements;

    beforeEach(function(done) {
      request(app)
        .get('/api/elements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          elements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(elements).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/elements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/elements')
        .send({
          name: 'New Element',
          info: 'This is the brand new element!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newElement = res.body;
          done();
        });
    });

    it('should respond with the newly created element', function() {
      expect(newElement.name).to.equal('New Element');
      expect(newElement.info).to.equal('This is the brand new element!!!');
    });
  });

  describe('GET /api/elements/:id', function() {
    var element;

    beforeEach(function(done) {
      request(app)
        .get(`/api/elements/${newElement._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          element = res.body;
          done();
        });
    });

    afterEach(function() {
      element = {};
    });

    it('should respond with the requested element', function() {
      expect(element.name).to.equal('New Element');
      expect(element.info).to.equal('This is the brand new element!!!');
    });
  });

  describe('PUT /api/elements/:id', function() {
    var updatedElement;

    beforeEach(function(done) {
      request(app)
        .put(`/api/elements/${newElement._id}`)
        .send({
          name: 'Updated Element',
          info: 'This is the updated element!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedElement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedElement = {};
    });

    it('should respond with the updated element', function() {
      expect(updatedElement.name).to.equal('Updated Element');
      expect(updatedElement.info).to.equal('This is the updated element!!!');
    });

    it('should respond with the updated element on a subsequent GET', function(done) {
      request(app)
        .get(`/api/elements/${newElement._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let element = res.body;

          expect(element.name).to.equal('Updated Element');
          expect(element.info).to.equal('This is the updated element!!!');

          done();
        });
    });
  });

  describe('PATCH /api/elements/:id', function() {
    var patchedElement;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/elements/${newElement._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Element' },
          { op: 'replace', path: '/info', value: 'This is the patched element!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedElement = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedElement = {};
    });

    it('should respond with the patched element', function() {
      expect(patchedElement.name).to.equal('Patched Element');
      expect(patchedElement.info).to.equal('This is the patched element!!!');
    });
  });

  describe('DELETE /api/elements/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/elements/${newElement._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when element does not exist', function(done) {
      request(app)
        .delete(`/api/elements/${newElement._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
