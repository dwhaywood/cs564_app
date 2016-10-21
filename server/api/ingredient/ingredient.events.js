/**
 * Ingredient model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ingredient = require('../../sqldb').Ingredient;
var IngredientEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IngredientEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Ingredient.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    IngredientEvents.emit(event + ':' + doc._id, doc);
    IngredientEvents.emit(event, doc);
    done(null);
  };
}

export default IngredientEvents;
