'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var scheduledMealCtrlStub = {
  index: 'scheduledMealCtrl.index',
  show: 'scheduledMealCtrl.show',
  create: 'scheduledMealCtrl.create',
  upsert: 'scheduledMealCtrl.upsert',
  patch: 'scheduledMealCtrl.patch',
  destroy: 'scheduledMealCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scheduledMealIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './scheduled-meal.controller': scheduledMealCtrlStub
});

describe('ScheduledMeal API Router:', function() {
  it('should return an express router instance', function() {
    scheduledMealIndex.should.equal(routerStub);
  });

  describe('GET /api/scheduled-meals', function() {
    it('should route to scheduledMeal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'scheduledMealCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/scheduled-meals/:id', function() {
    it('should route to scheduledMeal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'scheduledMealCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/scheduled-meals', function() {
    it('should route to scheduledMeal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'scheduledMealCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/scheduled-meals/:id', function() {
    it('should route to scheduledMeal.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'scheduledMealCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/scheduled-meals/:id', function() {
    it('should route to scheduledMeal.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'scheduledMealCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/scheduled-meals/:id', function() {
    it('should route to scheduledMeal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'scheduledMealCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
