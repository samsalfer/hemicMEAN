/**
 * Structure model events
 */

'use strict';

import {EventEmitter} from 'events';
var StructureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StructureEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Structure) {
  for(var e in events) {
    let event = events[e];
    Structure.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    StructureEvents.emit(event + ':' + doc._id, doc);
    StructureEvents.emit(event, doc);
  };
}

export {registerEvents};
export default StructureEvents;
