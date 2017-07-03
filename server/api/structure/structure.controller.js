/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/structures              ->  index
 * POST    /api/structures              ->  create
 * GET     /api/structures/:id          ->  show
 * PUT     /api/structures/:id          ->  upsert
 * PATCH   /api/structures/:id          ->  patch
 * DELETE  /api/structures/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Structure from './structure.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 409;
  return function(err) {
    if(err.errors) {
      let keys = Object.keys(err.errors);
      if(err.errors[keys[0]].kind === 'required') {
        return res.status(472).json(err);
      } else {
        return res.status(statusCode).json(err);
      }
    } else {
      return res.status(statusCode).json('Validation error');
    }
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

// Gets a list of Structures
export function index(req, res) {
  return Structure.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Structure from the DB
export function show(req, res) {
  return Structure.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Structure in the DB
export function create(req, res) {
  return Structure.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

// Upserts the given Structure in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Structure.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Structure in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Structure.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Structure from the DB
export function destroy(req, res) {
  return Structure.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
