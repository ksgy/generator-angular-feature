'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var Config = require('../config.js');
var Feature = require('../feature.js');


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  // Get configuration
  if (typeof(this.options['config']) === 'undefined')
    this.config = Config.getConfig({
      path: '',
      file: 'config.json'
    });
  else
    this.config = this.options['config'];

  this.featureParams = this.options['featureParams'] ||
      Feature.getParameters(this.name, this.config.common.path);
  this.name = this.featureParams.basename;

  this.sourceRoot(path.join(__dirname, '../templates'));

  // Application path will be read from config.json file (this.config.app.path).
  /*if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || this.config.app.path || 'app';
  }*/
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  this.template(
    'common/view.html',
    path.join(
      this.config.view.fullPath.replace(/\{\{feature\}\}/, this.featureParams.dirname),
      this.name.toLowerCase() + '.html'
    )
  );
};
