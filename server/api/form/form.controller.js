/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/forms              ->  index
 * POST    /api/forms              ->  create
 * GET     /api/forms/:id          ->  show
 * PUT     /api/forms/:id          ->  upsert
 * PATCH   /api/forms/:id          ->  patch
 * DELETE  /api/forms/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Form from './form.model';
import _ from 'lodash';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Forms
export function index(req, res) {
  let user = req.user;
  if(user) {
    if(user.role === 'admin') {
      return Form.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
    } else {
      return Form.find({statusForm: 'accepted'}).exec()
        .then(forms =>
          Form.find({user: user.id}).exec()
            .then(forms2 => {
              forms2 = _.uniqBy(forms2.concat(forms), 'id');
              return res.json(forms2);
            })
        );
    }
  }
  return res.status(403).end('Forbidden');
}

// Gets a single Form from the DB
export function show(req, res) {
  return Form.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Form in the DB
export function create(req, res) {
  req.body.user = req.user._id;
  return Form.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Form in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Form.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Form in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Form.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Form from the DB
export function destroy(req, res) {
  return Form.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
