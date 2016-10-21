'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var nutritionAttributesCtrlStub = {
  index: 'nutritionAttributesCtrl.index',
  show: 'nutritionAttributesCtrl.show',
  create: 'nutritionAttributesCtrl.create',
  upsert: 'nutritionAttributesCtrl.upsert',
  patch: 'nutritionAttributesCtrl.patch',
  destroy: 'nutritionAttributesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var nutritionAttributesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './nutrition-attributes.controller': nutritionAttributesCtrlStub
});

describe('NutritionAttributes API Router:', function() {
  it('should return an express router instance', function() {
    nutritionAttributesIndex.should.equal(routerStub);
  });

  describe('GET /api/nutrition-attributess', function() {
    it('should route to nutritionAttributes.controller.index', function() {
      routerStub.get
        .withArgs('/', 'nutritionAttributesCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/nutrition-attributess/:id', function() {
    it('should route to nutritionAttributes.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'nutritionAttributesCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/nutrition-attributess', function() {
    it('should route to nutritionAttributes.controller.create', function() {
      routerStub.post
        .withArgs('/', 'nutritionAttributesCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/nutrition-attributess/:id', function() {
    it('should route to nutritionAttributes.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'nutritionAttributesCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/nutrition-attributess/:id', function() {
    it('should route to nutritionAttributes.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'nutritionAttributesCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/nutrition-attributess/:id', function() {
    it('should route to nutritionAttributes.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'nutritionAttributesCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
