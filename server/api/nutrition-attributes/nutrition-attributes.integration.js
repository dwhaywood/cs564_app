'use strict';

var app = require('../..');
import request from 'supertest';

var newNutritionAttributes;

describe('NutritionAttributes API:', function() {
  describe('GET /api/nutrition-attributess', function() {
    var nutritionAttributess;

    beforeEach(function(done) {
      request(app)
        .get('/api/nutrition-attributess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          nutritionAttributess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      nutritionAttributess.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/nutrition-attributess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/nutrition-attributess')
        .send({
          name: 'New NutritionAttributes',
          info: 'This is the brand new nutritionAttributes!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNutritionAttributes = res.body;
          done();
        });
    });

    it('should respond with the newly created nutritionAttributes', function() {
      newNutritionAttributes.name.should.equal('New NutritionAttributes');
      newNutritionAttributes.info.should.equal('This is the brand new nutritionAttributes!!!');
    });
  });

  describe('GET /api/nutrition-attributess/:id', function() {
    var nutritionAttributes;

    beforeEach(function(done) {
      request(app)
        .get(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          nutritionAttributes = res.body;
          done();
        });
    });

    afterEach(function() {
      nutritionAttributes = {};
    });

    it('should respond with the requested nutritionAttributes', function() {
      nutritionAttributes.name.should.equal('New NutritionAttributes');
      nutritionAttributes.info.should.equal('This is the brand new nutritionAttributes!!!');
    });
  });

  describe('PUT /api/nutrition-attributess/:id', function() {
    var updatedNutritionAttributes;

    beforeEach(function(done) {
      request(app)
        .put(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
        .send({
          name: 'Updated NutritionAttributes',
          info: 'This is the updated nutritionAttributes!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNutritionAttributes = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNutritionAttributes = {};
    });

    it('should respond with the original nutritionAttributes', function() {
      updatedNutritionAttributes.name.should.equal('New NutritionAttributes');
      updatedNutritionAttributes.info.should.equal('This is the brand new nutritionAttributes!!!');
    });

    it('should respond with the updated nutritionAttributes on a subsequent GET', function(done) {
      request(app)
        .get(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let nutritionAttributes = res.body;

          nutritionAttributes.name.should.equal('Updated NutritionAttributes');
          nutritionAttributes.info.should.equal('This is the updated nutritionAttributes!!!');

          done();
        });
    });
  });

  describe('PATCH /api/nutrition-attributess/:id', function() {
    var patchedNutritionAttributes;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched NutritionAttributes' },
          { op: 'replace', path: '/info', value: 'This is the patched nutritionAttributes!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNutritionAttributes = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNutritionAttributes = {};
    });

    it('should respond with the patched nutritionAttributes', function() {
      patchedNutritionAttributes.name.should.equal('Patched NutritionAttributes');
      patchedNutritionAttributes.info.should.equal('This is the patched nutritionAttributes!!!');
    });
  });

  describe('DELETE /api/nutrition-attributess/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when nutritionAttributes does not exist', function(done) {
      request(app)
        .delete(`/api/nutrition-attributess/${newNutritionAttributes._id}`)
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
