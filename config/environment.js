var _ = require('lodash');

var localEnvVars = {
  TITLE:      'Scrum*tious',
  SAFE_TITLE: 'scrumtious'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
