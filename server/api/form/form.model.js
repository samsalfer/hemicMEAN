'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './form.events';
import shared from '../../config/environment/shared';

var FormSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  language: String,
  name: String,
  version: String,
  project: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  form: [],
  messages: [],
  stadistics: [],
  mode: {
    type: String,
    enum: ['structure', 'form', 'terminology'],
    required: true
  },
  statusForm: {
    type: String,
    enum: shared.statusConfig,
    default: 'pending'
  },
});

registerEvents(FormSchema);
export default mongoose.model('Form', FormSchema);
