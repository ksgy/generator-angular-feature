'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var Config = require('../config.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  // Get configuration
  if (typeof(this.options['config']) === 'undefined')
  this.config = Config.getConfig({
    path: '',
    file: 'config.json'
  });
  else
    this.config = this.options['config'];
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {
  this.generateSourceAndTest(
    'service/factory',
    'spec/service',
    this.config.service.path,
    this.options['skip-add'] || false
  );
};
