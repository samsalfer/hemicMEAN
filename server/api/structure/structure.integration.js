'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStructure;

describe('Structure API:', function() {
  describe('GET /api/structures', function() {
    var structures;

    beforeEach(function(done) {
      request(app)
        .get('/api/structures')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          structures = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(structures).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/structures', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/structures')
        .send({
          name: 'New Structure',
          info: 'This is the brand new structure!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStructure = res.body;
          done();
        });
    });

    it('should respond with the newly created structure', function() {
      expect(newStructure.name).to.equal('New Structure');
      expect(newStructure.info).to.equal('This is the brand new structure!!!');
    });
  });

  describe('GET /api/structures/:id', function() {
    var structure;

    beforeEach(function(done) {
      request(app)
        .get(`/api/structures/${newStructure._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          structure = res.body;
          done();
        });
    });

    afterEach(function() {
      structure = {};
    });

    it('should respond with the requested structure', function() {
      expect(structure.name).to.equal('New Structure');
      expect(structure.info).to.equal('This is the brand new structure!!!');
    });
  });

  describe('PUT /api/structures/:id', function() {
    var updatedStructure;

    beforeEach(function(done) {
      request(app)
        .put(`/api/structures/${newStructure._id}`)
        .send({
          name: 'Updated Structure',
          info: 'This is the updated structure!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStructure = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStructure = {};
    });

    it('should respond with the updated structure', function() {
      expect(updatedStructure.name).to.equal('Updated Structure');
      expect(updatedStructure.info).to.equal('This is the updated structure!!!');
    });

    it('should respond with the updated structure on a subsequent GET', function(done) {
      request(app)
        .get(`/api/structures/${newStructure._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let structure = res.body;

          expect(structure.name).to.equal('Updated Structure');
          expect(structure.info).to.equal('This is the updated structure!!!');

          done();
        });
    });
  });

  describe('PATCH /api/structures/:id', function() {
    var patchedStructure;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/structures/${newStructure._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Structure' },
          { op: 'replace', path: '/info', value: 'This is the patched structure!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStructure = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStructure = {};
    });

    it('should respond with the patched structure', function() {
      expect(patchedStructure.name).to.equal('Patched Structure');
      expect(patchedStructure.info).to.equal('This is the patched structure!!!');
    });
  });

  describe('DELETE /api/structures/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/structures/${newStructure._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when structure does not exist', function(done) {
      request(app)
        .delete(`/api/structures/${newStructure._id}`)
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
