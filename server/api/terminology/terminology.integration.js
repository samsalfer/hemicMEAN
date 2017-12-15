'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newTerminology;

describe('Terminology API:', function() {
  describe('GET /api/terminologys', function() {
    var terminologys;

    beforeEach(function(done) {
      request(app)
        .get('/api/terminologys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          terminologys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(terminologys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/terminologys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/terminologys')
        .send({
          name: 'New Terminology',
          info: 'This is the brand new terminology!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTerminology = res.body;
          done();
        });
    });

    it('should respond with the newly created terminology', function() {
      expect(newTerminology.name).to.equal('New Terminology');
      expect(newTerminology.info).to.equal('This is the brand new terminology!!!');
    });
  });

  describe('GET /api/terminologys/:id', function() {
    var terminology;

    beforeEach(function(done) {
      request(app)
        .get(`/api/terminologys/${newTerminology._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          terminology = res.body;
          done();
        });
    });

    afterEach(function() {
      terminology = {};
    });

    it('should respond with the requested terminology', function() {
      expect(terminology.name).to.equal('New Terminology');
      expect(terminology.info).to.equal('This is the brand new terminology!!!');
    });
  });

  describe('PUT /api/terminologys/:id', function() {
    var updatedTerminology;

    beforeEach(function(done) {
      request(app)
        .put(`/api/terminologys/${newTerminology._id}`)
        .send({
          name: 'Updated Terminology',
          info: 'This is the updated terminology!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTerminology = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTerminology = {};
    });

    it('should respond with the updated terminology', function() {
      expect(updatedTerminology.name).to.equal('Updated Terminology');
      expect(updatedTerminology.info).to.equal('This is the updated terminology!!!');
    });

    it('should respond with the updated terminology on a subsequent GET', function(done) {
      request(app)
        .get(`/api/terminologys/${newTerminology._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let terminology = res.body;

          expect(terminology.name).to.equal('Updated Terminology');
          expect(terminology.info).to.equal('This is the updated terminology!!!');

          done();
        });
    });
  });

  describe('PATCH /api/terminologys/:id', function() {
    var patchedTerminology;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/terminologys/${newTerminology._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Terminology' },
          { op: 'replace', path: '/info', value: 'This is the patched terminology!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTerminology = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTerminology = {};
    });

    it('should respond with the patched terminology', function() {
      expect(patchedTerminology.name).to.equal('Patched Terminology');
      expect(patchedTerminology.info).to.equal('This is the patched terminology!!!');
    });
  });

  describe('DELETE /api/terminologys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/terminologys/${newTerminology._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when terminology does not exist', function(done) {
      request(app)
        .delete(`/api/terminologys/${newTerminology._id}`)
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
