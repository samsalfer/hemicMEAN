'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './element.events';
import shared from '../../config/environment/shared';

let ElementSchema = new mongoose.Schema({
  form: {
    type: Schema.ObjectId,
    ref: 'Form'
  },
  type: String,
  typeStructure: String,
  typeShow: String,
  class: String,
  header: String,
  value: String,
  maxLength: Number,
  maxValue: Number,
  minValue: Number,
  options: [],
  container: [],
  multiple: Boolean,
  helptext: String,
  rows: Number,
  defaultValue: String,
  code: String,
  terminology: String,
  version: String
});
// var ElementSchema = new mongoose.Schema({
//   name: String,
//   codeTerm: String,
//   structures: [
//     {
//       type: Schema.ObjectId,
//       ref: 'Structure'
//     }
//   ],
//   typeData: {
//     type: String,
//     enum: shared.elementTypes,
//     required: true
//   },
//   idPath: String,
//   terms: [{}]
// });

registerEvents(ElementSchema);
export default mongoose.model('Element', ElementSchema);
