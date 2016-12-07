/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/recipes              ->  index
 * POST    /api/recipes              ->  create
 * GET     /api/recipes/:id          ->  show
 * PUT     /api/recipes/:id          ->  upsert
 * PATCH   /api/recipes/:id          ->  patch
 * DELETE  /api/recipes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Recipe} from '../../sqldb';
import {Ingredient} from '../../sqldb';
import {NutritionAttributes} from '../../sqldb';
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

// Gets a list of Recipes
export function index(req, res) {
  return Recipe.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Recipe from the DB
export function show(req, res) {
    var findOptions = {
        where: {
          _id: req.params.id
        },
        include: []
      };
    if (req.query.includeIngredients) {
        findOptions.include.push(Ingredient);
    }
    if (req.query.includeNutrition) {
        findOptions.include.push(NutritionAttributes);
    }
  return Recipe.find(findOptions)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a random Recipe from the DB
export function random(req, res) {
    
    return Recipe.findAll({
            attributes: ['_id']
        }).then(    
            _.sample
        )
        .then((recipe)=>{
            return Recipe.find({
                where: {
                  _id: recipe._id
        }
    });
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Recipe in the DB
export function create(req, res) {
  return Recipe.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Recipe in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Recipe.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Recipe in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Recipe.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Recipe from the DB
export function destroy(req, res) {
  return Recipe.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
