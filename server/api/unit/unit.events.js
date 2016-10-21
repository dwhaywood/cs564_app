/**
 * Unit model events
 */

'use strict';

import {EventEmitter} from 'events';
var Unit = require('../../sqldb').Unit;
var UnitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UnitEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Unit.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UnitEvents.emit(event + ':' + doc._id, doc);
    UnitEvents.emit(event, doc);
    done(null);
  };
}

export default UnitEvents;
