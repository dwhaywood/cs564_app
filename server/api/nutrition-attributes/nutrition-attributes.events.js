/**
 * NutritionAttributes model events
 */

'use strict';

import {EventEmitter} from 'events';
var NutritionAttributes = require('../../sqldb').NutritionAttributes;
var NutritionAttributesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NutritionAttributesEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  NutritionAttributes.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    NutritionAttributesEvents.emit(event + ':' + doc._id, doc);
    NutritionAttributesEvents.emit(event, doc);
    done(null);
  };
}

export default NutritionAttributesEvents;
