'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './form.events';

var FormSchema = new mongoose.Schema({
  name: String,
  form: []
});

registerEvents(FormSchema);
export default mongoose.model('Form', FormSchema);
