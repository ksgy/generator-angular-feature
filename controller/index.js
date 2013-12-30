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

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.generateSourceAndTest(
    'controller',
    'spec/controller',
    'controller',
    this.featureParams.dirname,
    this.options['skip-add'] || false
  );
};
