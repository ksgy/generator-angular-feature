'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var fs = require('fs');
var path = require('path');
var Config = require('../config.js');
var Feature = require('../feature.js');

var Generator = module.exports = function Generator(args, options) {
  ScriptBase.apply(this, arguments);

  // Get configuration
  this.config = this.options['config'] || Config.getConfig({
    path: '',
    file: 'config.json'
  });
    
  this.featureParams = this.options['featureParams'] ||
      Feature.getParameters(this.name, this.config.common.path);
  this.name = this.featureParams.basename;
  this.fullPath = Feature.getFullPath(this.config.decorator.fullPath, this.featureParams.dirname);

  this.fileName = this.name;
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForOverwrite = function askForOverwrite() {
  var cb = this.async();

  // TODO: Any yeoman.util function to handle this?
  var fileExists = fs.existsSync(buildRelativePath(path.join(this.fullPath, this.fileName)).toLowerCase() + ".js");
  if (fileExists) {
    var prompts = [{
      type: 'confirm',
      name: 'overwriteDecorator',
      message: 'Would you like to overwrite existing decorator?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.overwriteDecorator = props.overwriteDecorator;

      cb();
    }.bind(this));
  }
  else{
    cb();
    return;
  }
};

Generator.prototype.askForNewName = function askForNewName() {
  var cb = this.async();

  if (this.overwriteDecorator === undefined || this.overwriteDecorator === true) {
    cb();
    return;
  }
  else {
    var prompts = [];
    prompts.push({
      name: 'decoratorName',
      message: 'Alternative name for the decorator'
    });

    this.prompt(prompts, function (props) {
      this.fileName = props.decoratorName;

      cb();
    }.bind(this));
  }
};

Generator.prototype.createDecoratorFiles = function createDecoratorFiles() {
  this.appTemplate('decorator', buildRelativePath(path.join(this.fullPath, this.fileName)));
  this.addScriptToIndex(buildRelativePath(path.join(this.fullPath, this.fileName)));
};

function buildRelativePath(fileName){
  return fileName + "Decorator";
}
