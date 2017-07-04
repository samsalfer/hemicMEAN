'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var elementCtrlStub = {
  index: 'elementCtrl.index',
  show: 'elementCtrl.show',
  create: 'elementCtrl.create',
  upsert: 'elementCtrl.upsert',
  patch: 'elementCtrl.patch',
  destroy: 'elementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var elementIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './element.controller': elementCtrlStub
});

describe('Element API Router:', function() {
  it('should return an express router instance', function() {
    expect(elementIndex).to.equal(routerStub);
  });

  describe('GET /api/elements', function() {
    it('should route to element.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'elementCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/elements/:id', function() {
    it('should route to element.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'elementCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/elements', function() {
    it('should route to element.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'elementCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/elements/:id', function() {
    it('should route to element.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'elementCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/elements/:id', function() {
    it('should route to element.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'elementCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/elements/:id', function() {
    it('should route to element.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'elementCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
