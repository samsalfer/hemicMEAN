'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var terminologyCtrlStub = {
  index: 'terminologyCtrl.index',
  show: 'terminologyCtrl.show',
  create: 'terminologyCtrl.create',
  upsert: 'terminologyCtrl.upsert',
  patch: 'terminologyCtrl.patch',
  destroy: 'terminologyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var terminologyIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './terminology.controller': terminologyCtrlStub
});

describe('Terminology API Router:', function() {
  it('should return an express router instance', function() {
    expect(terminologyIndex).to.equal(routerStub);
  });

  describe('GET /api/terminologys', function() {
    it('should route to terminology.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'terminologyCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/terminologys/:id', function() {
    it('should route to terminology.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'terminologyCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/terminologys', function() {
    it('should route to terminology.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'terminologyCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/terminologys/:id', function() {
    it('should route to terminology.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'terminologyCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/terminologys/:id', function() {
    it('should route to terminology.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'terminologyCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/terminologys/:id', function() {
    it('should route to terminology.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'terminologyCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
