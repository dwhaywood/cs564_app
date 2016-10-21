'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var unitCtrlStub = {
  index: 'unitCtrl.index',
  show: 'unitCtrl.show',
  create: 'unitCtrl.create',
  upsert: 'unitCtrl.upsert',
  patch: 'unitCtrl.patch',
  destroy: 'unitCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var unitIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './unit.controller': unitCtrlStub
});

describe('Unit API Router:', function() {
  it('should return an express router instance', function() {
    unitIndex.should.equal(routerStub);
  });

  describe('GET /api/units', function() {
    it('should route to unit.controller.index', function() {
      routerStub.get
        .withArgs('/', 'unitCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/units/:id', function() {
    it('should route to unit.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'unitCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/units', function() {
    it('should route to unit.controller.create', function() {
      routerStub.post
        .withArgs('/', 'unitCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/units/:id', function() {
    it('should route to unit.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'unitCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/units/:id', function() {
    it('should route to unit.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'unitCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/units/:id', function() {
    it('should route to unit.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'unitCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
