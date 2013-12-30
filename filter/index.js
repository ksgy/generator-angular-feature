'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var Config = require('../config.js');
var Feature = require('../feature.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  // Get configuration
  this.config = this.options['config'] || Config.getConfig({
    path: '',
    file: 'config.json'
  });

  this.featureParams = this.options['featureParams'] ||
      Feature.getParameters(this.name, this.config.common.path);
  this.name = this.featureParams.basename;
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {
  this.generateSourceAndTest(
    'filter',
    'spec/filter',
    'filter',
    this.featureParams.dirname,
    this.options['skip-add'] || false
  );
};
