'use strict';

var app = require('../..');
import request from 'supertest';

var newScheduledMeal;

describe('ScheduledMeal API:', function() {
  describe('GET /api/scheduled-meals', function() {
    var scheduledMeals;

    beforeEach(function(done) {
      request(app)
        .get('/api/scheduled-meals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scheduledMeals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      scheduledMeals.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/scheduled-meals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/scheduled-meals')
        .send({
          name: 'New ScheduledMeal',
          info: 'This is the brand new scheduledMeal!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScheduledMeal = res.body;
          done();
        });
    });

    it('should respond with the newly created scheduledMeal', function() {
      newScheduledMeal.name.should.equal('New ScheduledMeal');
      newScheduledMeal.info.should.equal('This is the brand new scheduledMeal!!!');
    });
  });

  describe('GET /api/scheduled-meals/:id', function() {
    var scheduledMeal;

    beforeEach(function(done) {
      request(app)
        .get(`/api/scheduled-meals/${newScheduledMeal._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          scheduledMeal = res.body;
          done();
        });
    });

    afterEach(function() {
      scheduledMeal = {};
    });

    it('should respond with the requested scheduledMeal', function() {
      scheduledMeal.name.should.equal('New ScheduledMeal');
      scheduledMeal.info.should.equal('This is the brand new scheduledMeal!!!');
    });
  });

  describe('PUT /api/scheduled-meals/:id', function() {
    var updatedScheduledMeal;

    beforeEach(function(done) {
      request(app)
        .put(`/api/scheduled-meals/${newScheduledMeal._id}`)
        .send({
          name: 'Updated ScheduledMeal',
          info: 'This is the updated scheduledMeal!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScheduledMeal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScheduledMeal = {};
    });

    it('should respond with the original scheduledMeal', function() {
      updatedScheduledMeal.name.should.equal('New ScheduledMeal');
      updatedScheduledMeal.info.should.equal('This is the brand new scheduledMeal!!!');
    });

    it('should respond with the updated scheduledMeal on a subsequent GET', function(done) {
      request(app)
        .get(`/api/scheduled-meals/${newScheduledMeal._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let scheduledMeal = res.body;

          scheduledMeal.name.should.equal('Updated ScheduledMeal');
          scheduledMeal.info.should.equal('This is the updated scheduledMeal!!!');

          done();
        });
    });
  });

  describe('PATCH /api/scheduled-meals/:id', function() {
    var patchedScheduledMeal;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/scheduled-meals/${newScheduledMeal._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ScheduledMeal' },
          { op: 'replace', path: '/info', value: 'This is the patched scheduledMeal!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScheduledMeal = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScheduledMeal = {};
    });

    it('should respond with the patched scheduledMeal', function() {
      patchedScheduledMeal.name.should.equal('Patched ScheduledMeal');
      patchedScheduledMeal.info.should.equal('This is the patched scheduledMeal!!!');
    });
  });

  describe('DELETE /api/scheduled-meals/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/scheduled-meals/${newScheduledMeal._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when scheduledMeal does not exist', function(done) {
      request(app)
        .delete(`/api/scheduled-meals/${newScheduledMeal._id}`)
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
