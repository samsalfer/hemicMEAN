'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './config.events';
import shared from '../../config/environment/shared';

var ConfigSchema = new mongoose.Schema({
  name: String,
  structures: [],
  active: Boolean,
  statusConfig: {
    type: String,
    enum: shared.statusConfig,
    default: 'pending'
  }
});

registerEvents(ConfigSchema);
export default mongoose.model('Config', ConfigSchema);
