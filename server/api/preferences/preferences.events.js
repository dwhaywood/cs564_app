/**
 * Preferences model events
 */

'use strict';

import {EventEmitter} from 'events';
var Preferences = require('../../sqldb').Preferences;
var PreferencesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PreferencesEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Preferences.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PreferencesEvents.emit(event + ':' + doc._id, doc);
    PreferencesEvents.emit(event, doc);
    done(null);
  };
}

export default PreferencesEvents;
