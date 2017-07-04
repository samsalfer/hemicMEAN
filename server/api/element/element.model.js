'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './element.events';
import shared from '../../config/environment/shared';

var ElementSchema = new mongoose.Schema({
  name: String,
  codeTerm: String,
  structures: [
    {
      type: Schema.ObjectId,
      ref: 'Structure'
    }
  ],
  typeData: {
    type: String,
    enum: shared.elementTypes,
    required: true
  },
  idPath: String,
  terms: [{}]
});

registerEvents(ElementSchema);
export default mongoose.model('Element', ElementSchema);
