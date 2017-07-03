'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var structureCtrlStub = {
  index: 'structureCtrl.index',
  show: 'structureCtrl.show',
  create: 'structureCtrl.create',
  upsert: 'structureCtrl.upsert',
  patch: 'structureCtrl.patch',
  destroy: 'structureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var structureIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './structure.controller': structureCtrlStub
});

describe('Structure API Router:', function() {
  it('should return an express router instance', function() {
    expect(structureIndex).to.equal(routerStub);
  });

  describe('GET /api/structures', function() {
    it('should route to structure.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'structureCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/structures/:id', function() {
    it('should route to structure.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'structureCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/structures', function() {
    it('should route to structure.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'structureCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/structures/:id', function() {
    it('should route to structure.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'structureCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/structures/:id', function() {
    it('should route to structure.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'structureCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/structures/:id', function() {
    it('should route to structure.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'structureCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
