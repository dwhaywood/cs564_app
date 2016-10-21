/**
 * ScheduledMeal model events
 */

'use strict';

import {EventEmitter} from 'events';
var ScheduledMeal = require('../../sqldb').ScheduledMeal;
var ScheduledMealEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScheduledMealEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  ScheduledMeal.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ScheduledMealEvents.emit(event + ':' + doc._id, doc);
    ScheduledMealEvents.emit(event, doc);
    done(null);
  };
}

export default ScheduledMealEvents;
