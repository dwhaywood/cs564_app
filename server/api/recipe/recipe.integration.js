'use strict';

var app = require('../..');
import request from 'supertest';

var newRecipe;

describe('Recipe API:', function() {
  describe('GET /api/recipes', function() {
    var recipes;

    beforeEach(function(done) {
      request(app)
        .get('/api/recipes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          recipes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      recipes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/recipes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/recipes')
        .send({
          name: 'New Recipe',
          info: 'This is the brand new recipe!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRecipe = res.body;
          done();
        });
    });

    it('should respond with the newly created recipe', function() {
      newRecipe.name.should.equal('New Recipe');
      newRecipe.info.should.equal('This is the brand new recipe!!!');
    });
  });

  describe('GET /api/recipes/:id', function() {
    var recipe;

    beforeEach(function(done) {
      request(app)
        .get(`/api/recipes/${newRecipe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          recipe = res.body;
          done();
        });
    });

    afterEach(function() {
      recipe = {};
    });

    it('should respond with the requested recipe', function() {
      recipe.name.should.equal('New Recipe');
      recipe.info.should.equal('This is the brand new recipe!!!');
    });
  });

  describe('PUT /api/recipes/:id', function() {
    var updatedRecipe;

    beforeEach(function(done) {
      request(app)
        .put(`/api/recipes/${newRecipe._id}`)
        .send({
          name: 'Updated Recipe',
          info: 'This is the updated recipe!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRecipe = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecipe = {};
    });

    it('should respond with the original recipe', function() {
      updatedRecipe.name.should.equal('New Recipe');
      updatedRecipe.info.should.equal('This is the brand new recipe!!!');
    });

    it('should respond with the updated recipe on a subsequent GET', function(done) {
      request(app)
        .get(`/api/recipes/${newRecipe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let recipe = res.body;

          recipe.name.should.equal('Updated Recipe');
          recipe.info.should.equal('This is the updated recipe!!!');

          done();
        });
    });
  });

  describe('PATCH /api/recipes/:id', function() {
    var patchedRecipe;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/recipes/${newRecipe._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Recipe' },
          { op: 'replace', path: '/info', value: 'This is the patched recipe!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRecipe = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRecipe = {};
    });

    it('should respond with the patched recipe', function() {
      patchedRecipe.name.should.equal('Patched Recipe');
      patchedRecipe.info.should.equal('This is the patched recipe!!!');
    });
  });

  describe('DELETE /api/recipes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/recipes/${newRecipe._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when recipe does not exist', function(done) {
      request(app)
        .delete(`/api/recipes/${newRecipe._id}`)
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
