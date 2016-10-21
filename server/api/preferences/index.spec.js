'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var preferencesCtrlStub = {
  index: 'preferencesCtrl.index',
  show: 'preferencesCtrl.show',
  create: 'preferencesCtrl.create',
  upsert: 'preferencesCtrl.upsert',
  patch: 'preferencesCtrl.patch',
  destroy: 'preferencesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var preferencesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './preferences.controller': preferencesCtrlStub
});

describe('Preferences API Router:', function() {
  it('should return an express router instance', function() {
    preferencesIndex.should.equal(routerStub);
  });

  describe('GET /api/preferences', function() {
    it('should route to preferences.controller.index', function() {
      routerStub.get
        .withArgs('/', 'preferencesCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/preferences/:id', function() {
    it('should route to preferences.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'preferencesCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/preferences', function() {
    it('should route to preferences.controller.create', function() {
      routerStub.post
        .withArgs('/', 'preferencesCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/preferences/:id', function() {
    it('should route to preferences.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'preferencesCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/preferences/:id', function() {
    it('should route to preferences.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'preferencesCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/preferences/:id', function() {
    it('should route to preferences.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'preferencesCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
