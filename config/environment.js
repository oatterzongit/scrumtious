var _ = require('lodash');

var localEnvVars = {
  TITLE:      'virtual_stand_up',
  SAFE_TITLE: 'virtual_stand_up'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
