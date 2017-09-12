'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://hemicUser:telemedicina@ec2-54-144-199-211.compute-1.amazonaws.com:27017/dummyDB'
  },

  // Seed database on startup
  seedDB: false

};
