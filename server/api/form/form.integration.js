'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newForm;

describe('Form API:', function() {
  describe('GET /api/forms', function() {
    var forms;

    beforeEach(function(done) {
      request(app)
        .get('/api/forms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          forms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(forms).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/forms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/forms')
        .send({
          name: 'New Form',
          info: 'This is the brand new form!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newForm = res.body;
          done();
        });
    });

    it('should respond with the newly created form', function() {
      expect(newForm.name).to.equal('New Form');
      expect(newForm.info).to.equal('This is the brand new form!!!');
    });
  });

  describe('GET /api/forms/:id', function() {
    var form;

    beforeEach(function(done) {
      request(app)
        .get(`/api/forms/${newForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          form = res.body;
          done();
        });
    });

    afterEach(function() {
      form = {};
    });

    it('should respond with the requested form', function() {
      expect(form.name).to.equal('New Form');
      expect(form.info).to.equal('This is the brand new form!!!');
    });
  });

  describe('PUT /api/forms/:id', function() {
    var updatedForm;

    beforeEach(function(done) {
      request(app)
        .put(`/api/forms/${newForm._id}`)
        .send({
          name: 'Updated Form',
          info: 'This is the updated form!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedForm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedForm = {};
    });

    it('should respond with the updated form', function() {
      expect(updatedForm.name).to.equal('Updated Form');
      expect(updatedForm.info).to.equal('This is the updated form!!!');
    });

    it('should respond with the updated form on a subsequent GET', function(done) {
      request(app)
        .get(`/api/forms/${newForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let form = res.body;

          expect(form.name).to.equal('Updated Form');
          expect(form.info).to.equal('This is the updated form!!!');

          done();
        });
    });
  });

  describe('PATCH /api/forms/:id', function() {
    var patchedForm;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/forms/${newForm._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Form' },
          { op: 'replace', path: '/info', value: 'This is the patched form!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedForm = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedForm = {};
    });

    it('should respond with the patched form', function() {
      expect(patchedForm.name).to.equal('Patched Form');
      expect(patchedForm.info).to.equal('This is the patched form!!!');
    });
  });

  describe('DELETE /api/forms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/forms/${newForm._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when form does not exist', function(done) {
      request(app)
        .delete(`/api/forms/${newForm._id}`)
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
