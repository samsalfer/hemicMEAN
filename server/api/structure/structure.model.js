'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './structure.events';

var StructureSchema = new mongoose.Schema({
  type: {
    type: String,
    unique: true,
    required: 'Please fill type'
  },
  data: {
    type: Object,
    required: 'Please fill Object'
  }
});

registerEvents(StructureSchema);
export default mongoose.model('Structure', StructureSchema);
