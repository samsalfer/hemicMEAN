'use strict';

import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './form.events';
import shared from '../../config/environment/shared';

var FormSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  form: [],
  statusForm: {
    type: String,
    enum: shared.statusConfig,
    default: 'pending'
  },
});

registerEvents(FormSchema);
export default mongoose.model('Form', FormSchema);
