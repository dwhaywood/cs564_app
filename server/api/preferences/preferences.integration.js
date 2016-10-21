'use strict';

var app = require('../..');
import request from 'supertest';

var newPreferences;

describe('Preferences API:', function() {
  describe('GET /api/preferences', function() {
    var preferencess;

    beforeEach(function(done) {
      request(app)
        .get('/api/preferences')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          preferencess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      preferencess.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/preferences', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/preferences')
        .send({
          name: 'New Preferences',
          info: 'This is the brand new preferences!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPreferences = res.body;
          done();
        });
    });

    it('should respond with the newly created preferences', function() {
      newPreferences.name.should.equal('New Preferences');
      newPreferences.info.should.equal('This is the brand new preferences!!!');
    });
  });

  describe('GET /api/preferences/:id', function() {
    var preferences;

    beforeEach(function(done) {
      request(app)
        .get(`/api/preferences/${newPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          preferences = res.body;
          done();
        });
    });

    afterEach(function() {
      preferences = {};
    });

    it('should respond with the requested preferences', function() {
      preferences.name.should.equal('New Preferences');
      preferences.info.should.equal('This is the brand new preferences!!!');
    });
  });

  describe('PUT /api/preferences/:id', function() {
    var updatedPreferences;

    beforeEach(function(done) {
      request(app)
        .put(`/api/preferences/${newPreferences._id}`)
        .send({
          name: 'Updated Preferences',
          info: 'This is the updated preferences!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPreferences = {};
    });

    it('should respond with the original preferences', function() {
      updatedPreferences.name.should.equal('New Preferences');
      updatedPreferences.info.should.equal('This is the brand new preferences!!!');
    });

    it('should respond with the updated preferences on a subsequent GET', function(done) {
      request(app)
        .get(`/api/preferences/${newPreferences._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let preferences = res.body;

          preferences.name.should.equal('Updated Preferences');
          preferences.info.should.equal('This is the updated preferences!!!');

          done();
        });
    });
  });

  describe('PATCH /api/preferences/:id', function() {
    var patchedPreferences;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/preferences/${newPreferences._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Preferences' },
          { op: 'replace', path: '/info', value: 'This is the patched preferences!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPreferences = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPreferences = {};
    });

    it('should respond with the patched preferences', function() {
      patchedPreferences.name.should.equal('Patched Preferences');
      patchedPreferences.info.should.equal('This is the patched preferences!!!');
    });
  });

  describe('DELETE /api/preferences/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/preferences/${newPreferences._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when preferences does not exist', function(done) {
      request(app)
        .delete(`/api/preferences/${newPreferences._id}`)
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
