'use strict';

var express = require('express');
import db from '../sqldb';
var router = express.Router();
var fs = require('fs');
import Sequelize from 'sequelize';


var paramedQuery = function (req, res) {
  var queryString = req.query.sql;
    var replacements= JSON.parse(req.query.replacements);
    console.log("Running: "+queryString+'\nWith replacements:'+replacements);
   return db.sequelize.query(queryString, { type: Sequelize.QueryTypes.RAW, replacements:replacements})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

var namedQuery = function (req, res) {
  var name = req.params.name;
    var queryString = "";
    switch (name) {
        case name:
           queryString = fs.readFileSync('./server/api/queries/'+name+'.sql').toString();
            break;
        default:
            queryString = fs.readFileSync('./server/api/query.sql').toString();
    }
    console.log("Running: "+queryString);
   return db.sequelize.query(queryString, { type: db.sequelize.QueryTypes.RAW})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

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

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
        //console.log(res);
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

router.get('/', paramedQuery);
router.get('/:name', namedQuery);


module.exports = router;