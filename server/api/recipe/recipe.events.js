/**
 * Recipe model events
 */

'use strict';

import {EventEmitter} from 'events';
var Recipe = require('../../sqldb').Recipe;
var RecipeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RecipeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Recipe.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RecipeEvents.emit(event + ':' + doc._id, doc);
    RecipeEvents.emit(event, doc);
    done(null);
  };
}

export default RecipeEvents;
