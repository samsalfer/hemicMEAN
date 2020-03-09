'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
     // uri: 'mongodb://hemicUser:telemedicina@ec2-3-84-218-16.compute-1.amazonaws.com/dummyDB'
     uri: 'mongodb://mongodb2/dummyDB'
  },

  // Seed database on startup
  seedDB: true
};

// mongodump --host ec2-3-84-218-16.compute-1.amazonaws.com --db dummyDB --username hemicUser --password telemedicina --out /data/db/security-copy
