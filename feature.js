'use strict';
var path = require('path');

module.exports = {
  getParameters: getParameters,
  getFullPath: getFullPath
};

function getParameters(componentName, defaultFeatureName) {
  var parameters = {};

  if (componentName.lastIndexOf('/') == -1) {
    parameters.dirname = defaultFeatureName;
    parameters.basename = componentName;
  }
  else {
    parameters.dirname = path.dirname(componentName);
    parameters.basename = path.basename(componentName);
  };

  return parameters;
}

function getFullPath(fullPath, dirname) {
  return fullPath.replace(/\{\{feature\}\}/, dirname);
}