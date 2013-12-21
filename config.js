'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');

module.exports = {
  getConfig: getConfig
};

function getConfig(args) {
  var fullPath = path.join(args.path, args.file);
  var config = null;
  
  if (fs.existsSync(fullPath))
    config = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  else
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/templates/config-component.json'), 'utf8'));

  calculatePath(config, config['structure']);
  
  return config;
}

function calculatePath(rootNode, node, nodePath) {
  if (typeof(node) == 'object')
    for (var key in node) {
      if (typeof node[key].path !== 'undefined') {
        if (!rootNode[key])
          rootNode[key] = {};
        rootNode[key].path = substitutePath(node, key);
        rootNode[key].fullPath = path.join((nodePath ? nodePath : ''), rootNode[key].path);
        calculatePath(rootNode, node[key], rootNode[key].fullPath);
      }
    }
}

function substitutePath(node, key) {
  var subPath = node[key].path.match(/\[.+\]/);
  if (subPath != null) {
    var subKeyName = subPath[0].replace(/\[/, '').replace(/\]/, '');
    return node[key].path.replace(subPath[0], substitutePath(node, subKeyName));
  }
  else {
    return node[key].path;
  }
}
