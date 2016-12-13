/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/nutrition-attributess              ->  index
 * POST    /api/nutrition-attributess              ->  create
 * GET     /api/nutrition-attributess/:id          ->  show
 * PUT     /api/nutrition-attributess/:id          ->  upsert
 * PATCH   /api/nutrition-attributess/:id          ->  patch
 * DELETE  /api/nutrition-attributess/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {NutritionAttributes} from '../../sqldb';

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

// Gets a list of NutritionAttributess
export function index(req, res) {
    var whereattributes = {}
    
    if (req.query.RecipeId){
        whereattributes.RecipeId = req.query.RecipeId;
    }
  return NutritionAttributes.findAll({where: whereattributes})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single NutritionAttributes from the DB
export function show(req, res) {
  return NutritionAttributes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new NutritionAttributes in the DB
export function create(req, res) {
  return NutritionAttributes.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given NutritionAttributes in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return NutritionAttributes.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing NutritionAttributes in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return NutritionAttributes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a NutritionAttributes from the DB
export function destroy(req, res) {
  return NutritionAttributes.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
