'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './terminology.events';

var TerminologySchema = new mongoose.Schema({
  display: String,
  code: String,
  terminology: String,
  version: String
});

registerEvents(TerminologySchema);
export default mongoose.model('Terminology', TerminologySchema);
