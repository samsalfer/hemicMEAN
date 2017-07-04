/**
 * Element model events
 */

'use strict';

import {EventEmitter} from 'events';
var ElementEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ElementEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Element) {
  for(var e in events) {
    let event = events[e];
    Element.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ElementEvents.emit(event + ':' + doc._id, doc);
    ElementEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ElementEvents;
