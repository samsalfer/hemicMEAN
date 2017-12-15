/**
 * Terminology model events
 */

'use strict';

import {EventEmitter} from 'events';
var TerminologyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TerminologyEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Terminology) {
  for(var e in events) {
    let event = events[e];
    Terminology.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    TerminologyEvents.emit(event + ':' + doc._id, doc);
    TerminologyEvents.emit(event, doc);
  };
}

export {registerEvents};
export default TerminologyEvents;
