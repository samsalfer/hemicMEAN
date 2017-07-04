'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './structure.events';

var StructureSchema = new mongoose.Schema({
  idStructure: {
    type: String,
    required: 'Please fill IDStructure'
  },
  version: {
    type: String,
    required: 'Please fill version'
  },
  name: {
    type: String,
    required: 'Please fill name'
  },
  codeTerm: {
    type: String,
    required: 'Please fill codeTerm'
  },
  idPath: {
    type: String,
    required: 'Please fill idPath'
  },
  lifeCycle: {
    type: String,
    required: 'Please fill lifeCycle'
  },
  language: {
    type: String,
    required: 'Please fill language'
  },
  elements: [{
    type: Schema.ObjectId,
    ref: 'Element',
    // required: 'Please fill id_element'
  }]
});

registerEvents(StructureSchema);
export default mongoose.model('Structure', StructureSchema);
