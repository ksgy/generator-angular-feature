'use strict';
var fs = require('fs');
var util = require('util');
var path = require('path');

module.exports = {
  getConfig: getConfig,
  rewriteFile: rewriteFile
};

function getConfig(args) {
  var fullPath = path.join(args.path, args.file);
  var config = null;
  
  if (fs.existsSync(fullPath))
    config = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  else
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config/templates/config-component.json'), 'utf8'));

  calculateFullPath(config, config['structure']);
  calculateAppPath(config, config['structure'].app);
  
  return config;
}

function rewriteFile(args) {
  args.path = args.path || process.cwd();
  var fullPath = path.join(args.path, args.file);
  var file = fs.readFileSync(fullPath, 'utf8');

  for (var key in args.map)
    file = file.replace(new RegExp(escapeRegExp(key), 'g'), args.map[key]);

  fs.writeFileSync(fullPath, file);
};

function calculateFullPath(rootNode, node, nodePath) {
  if (typeof(node) == 'object')
    for (var key in node) {
      if (typeof node[key].path !== 'undefined') {
        if (!rootNode[key])
          rootNode[key] = {};
        rootNode[key].path = substitutePath(node, key);
        rootNode[key].fullPath = path.join((nodePath ? nodePath : ''), rootNode[key].path);
        calculateFullPath(rootNode, node[key], rootNode[key].fullPath);
      }
    }
}

function calculateAppPath(rootNode, node, nodePath) {
  if (typeof(node) == 'object')
    for (var key in node) {
      if (typeof node[key].path !== 'undefined') {
        if (!rootNode[key])
          rootNode[key] = {};
        var _path = substitutePath(node, key);
        rootNode[key].appPath = path.join((nodePath ? nodePath : ''), _path);
        calculateAppPath(rootNode, node[key], rootNode[key].appPath);
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

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}