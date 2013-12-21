'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var fs = require('fs');
var Config = require('../config.js');

var Generator = module.exports = function Generator(args, options) {
  ScriptBase.apply(this, arguments);

  // Get configuration
  if (typeof(this.options['config']) === 'undefined')
  this.config = Config.getConfig({
    path: '',
    file: 'config.json'
  });
  else
    this.config = this.options['config'];

  this.fileName = this.name;
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askForOverwrite = function askForOverwrite() {
  var cb = this.async();

  // TODO: Any yeoman.util function to handle this?
  var fileExists = fs.existsSync(this.env.cwd + path.join('/', this.config.app.path, this.config.source.path) + buildRelativePath(this.fileName) + ".js");
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
  this.appTemplate('decorator', path.join(this.config.source.path, buildRelativePath(this.fileName)));
  this.addScriptToIndex(buildRelativePath(this.fileName));
};

function buildRelativePath(fileName){
  return path.join(this.config.decorator.path, fileName + "Decorator");
}
