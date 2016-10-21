'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var recipeCtrlStub = {
  index: 'recipeCtrl.index',
  show: 'recipeCtrl.show',
  create: 'recipeCtrl.create',
  upsert: 'recipeCtrl.upsert',
  patch: 'recipeCtrl.patch',
  destroy: 'recipeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var recipeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './recipe.controller': recipeCtrlStub
});

describe('Recipe API Router:', function() {
  it('should return an express router instance', function() {
    recipeIndex.should.equal(routerStub);
  });

  describe('GET /api/recipes', function() {
    it('should route to recipe.controller.index', function() {
      routerStub.get
        .withArgs('/', 'recipeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/recipes/:id', function() {
    it('should route to recipe.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'recipeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/recipes', function() {
    it('should route to recipe.controller.create', function() {
      routerStub.post
        .withArgs('/', 'recipeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/recipes/:id', function() {
    it('should route to recipe.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'recipeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/recipes/:id', function() {
    it('should route to recipe.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'recipeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/recipes/:id', function() {
    it('should route to recipe.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'recipeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
