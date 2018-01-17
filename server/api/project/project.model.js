'use strict';


import mongoose, {Schema} from 'mongoose';
import {registerEvents} from './project.events';

var ProjectSchema = new mongoose.Schema({
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  forms: [{
    type: Schema.ObjectId,
    ref: 'Form'
  }],
  code: String,
  name: {
    type: String,
    required: true
  },
  type: String
});

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
