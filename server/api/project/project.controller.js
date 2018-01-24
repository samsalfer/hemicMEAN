/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/projects              ->  index
 * POST    /api/projects              ->  create
 * GET     /api/projects/:id          ->  show
 * PUT     /api/projects/:id          ->  upsert
 * PATCH   /api/projects/:id          ->  patch
 * DELETE  /api/projects/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Project from './project.model';
import Q from 'q';
import User from '../user/user.model';


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

// Gets a list of Projects
export function index(req, res) {
  return Project.find()
    .populate({path: 'users', model: 'User'})
    .populate({path: 'forms', model: 'Form'})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Project from the DB
export function show(req, res) {
  console.log(req.user.projects);
  if(req.user.projects.indexOf(req.params.id >= 0) || req.user.role === 'admin') {
    return Project.findById(req.params.id)
      .populate({path: 'users', model: 'User'})
      .populate({path: 'forms', model: 'Form'})
      .exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    return res.status(403).end('Forbidden');
  }
}

// Creates a new Project in the DB
export function create(req, res) {
  let users = [req.user.id];
  req.body.users = users;
  return Project.create(req.body)
    .then(insertProjectUsers())
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

function insertProjectUsers(res) {
  return function(entity) {
    if(entity) {
      if(entity.users.length > 0) {
        let promises = [];
        // entity.users.forEach(user => {
        promises.push(User.findByIdAndUpdate({_id: entity.users[entity.users.length - 1]}, {$push: {projects: entity._id}}).exec()
          .then(user2 => user2._id)
          .catch(handleError(res)));
        // });
        return Q.all(promises)
          .then(() => entity);
      } else {
        return entity;
      }
    }
    return null;
  };
}
// Upserts the given Project in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Project.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(insertProjectUsers())
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Project in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Project from the DB
export function destroy(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
