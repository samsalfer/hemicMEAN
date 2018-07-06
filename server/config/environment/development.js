'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
     uri: 'mongodb://hemicUser:telemedicina@ec2-52-91-46-102.compute-1.amazonaws.com/dummyDB'
     // uri: 'mongodb://mongodb2/dummyDB'
  },

  // Seed database on startup
  seedDB: false

};
