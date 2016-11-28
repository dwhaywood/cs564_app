/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/scheduled-meals              ->  index
 * POST    /api/scheduled-meals              ->  create
 * GET     /api/scheduled-meals/:id          ->  show
 * PUT     /api/scheduled-meals/:id          ->  upsert
 * PATCH   /api/scheduled-meals/:id          ->  patch
 * DELETE  /api/scheduled-meals/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {ScheduledMeal} from '../../sqldb';

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
      return entity.destroy()
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

// Gets a list of ScheduledMeals
export function index(req, res) {
  return ScheduledMeal.findAll({where:req.query})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ScheduledMeal from the DB
export function show(req, res) {
  return ScheduledMeal.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ScheduledMeal in the DB
export function create(req, res) {
  return ScheduledMeal.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given ScheduledMeal in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return ScheduledMeal.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing ScheduledMeal in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return ScheduledMeal.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ScheduledMeal from the DB
export function destroy(req, res) {
  return ScheduledMeal.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
