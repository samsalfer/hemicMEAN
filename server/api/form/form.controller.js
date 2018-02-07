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
import Element from '../element/element.model';
import _ from 'lodash';
import Q from 'q';
import Project from '../project/project.model';


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
  console.log(req.query.filter);
  var filter = {}
  if(req.query.filter === 'structure'){
    filter['mode'] = [req.query.filter, 'terminology'];
  }
  if(user) {
    if(user.role === 'admin') {
      return Form.find().where(filter).populate({path:'form', model:'Element'}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
    } else {
      return Form.find({project: req.user.projects}).exec()
        .then(forms => {
          return res.json(forms);
          // Form.find({user: user.id}).exec()
          //   .then(forms2 => {
          //     forms2 = _.uniqBy(forms2.concat(forms), 'id');
          //     return res.json(forms2);
          //   })
        });
    }
  }
  return res.status(403).end('Forbidden');
}

// Gets a single Form from the DB
export function show(req, res) {
  return Form.findById(req.params.id)
    .populate({path: 'form', model: 'Element'})
    .populate({path: 'project', model: 'Project', select: 'users'})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Form in the DB
export function create(req, res) {
  req.body.user = req.user._id;
  let elements = req.body.form;
  return Form.findOne({name: req.body.name, version: req.body.version, project: req.body.project, language: req.body.language }).exec()
    .then(form0 => {
      if(form0){
        return form0.remove();
      } else {
        return true;
      }
    })
    .then(() => {
      return Form.create({
        name: req.body.name,
        version: req.body.version,
        project: req.body.project,
        language: req.body.language,
        mode: req.body.mode,
        messages: req.body.messages
      })
        .then(form => {
          console.log('LLEGA:', form);
          if (form) {
            let promises = [];
            console.log(elements);
            elements.forEach(element => {
              if (element._id) {
                delete element._id;
              }
              element.form = form._id;
              if (element.type !== 'section') {
                promises.push(Element.create(element)
                  .then(ele => {
                    if (ele) {
                      return ele._id;
                    } else {
                      return null;
                    }
                  }));
              } else {
                //todo controlar los sections;
                promises.push(new Q(createSection(element, form._id, true)));
              }
            });
            return Q.all(promises)
              .then(data => {
                form.form = data;
                console.log('IDS:', data);
                return form.save();
              });
          } else {
            return null;
          }
        })
        .then(insertFormsProject())
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
    });
}

function createSection(element, idForm, first) {
  let promises = [];
  if(element.container.length > 0) {
    element.container.forEach(eleContainer => {
      if(eleContainer.type === 'section') {
        promises.push(new Q(createSection(eleContainer, idForm, false)));
      } else {
        if(eleContainer._id) {
          delete eleContainer._id;
        }
        eleContainer.form = idForm;
        promises.push(Element.create(eleContainer));
      }
    });
    return Q.all(promises)
      .then(data => {
        element.container = data;
        // console.log(data);
        // return data;
        if(element._id) {
          delete element._id;
        }
        return Element.create(element).then(ele => {
          if(ele) {
            if(first)
              return ele._id;
            else
              return ele;
          } else {
            return null;
          }
        });
      });
  } else {
    if(element._id) {
      delete element._id;
    }
    return Element.create(element).then(ele => {
      if(ele) {
        if(first)
          return ele._id;
        else
          return ele;
      } else {
        return null;
      }
    });
  }
}
// Añade al proyecto la ID del Formulario
function insertFormsProject(res) {
  return function(entity) {
    if(entity) {
      if(entity.project != '') {
        let promises = [];
        promises.push(Project.findByIdAndUpdate({_id: entity.project}, {$push: {forms: entity._id}}).exec()
          .catch(handleError(res)));
        return Q.all(promises)
          .then(() => entity);
      } else {
        return entity;
      }
    }
    return null;
  };
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
// Deletes a Form from the DB
export function getProjects(req, res) {
  return Form.find().distinct('project', function(error, projects){
    console.log(projects);
    return res.json(projects);
  });
}
