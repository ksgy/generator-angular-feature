'use strict';
var path = require('path');
var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var Config = require('../config.js');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // Get configuration
  if (typeof(this.options['config']) === 'undefined')
	this.config = Config.getConfig({
		path: '',
		file: 'config.json'
	});
  else
  	this.config = this.options['config'];
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.renameDirs = function renameDirs() {
  fs.renameSync(path.join(__dirname, '../templates/common/root/app/views'),
      path.join(__dirname, '../templates/common/root/app', this.config.view.path));
  fs.renameSync(path.join(__dirname, '../templates/common/root/app'),
      path.join(__dirname, '../templates/common/root', this.config.app.path));
  fs.renameSync(path.join(__dirname, '../templates/common/root/test'),
      path.join(__dirname, '../templates/common/root', this.config.test.path));
};

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.directory('root', '.', true);
};

Generator.prototype.rollbackRename = function rollbackRename() {
  fs.renameSync(path.join(__dirname, '../templates/common/root', this.config.app.path),
      path.join(__dirname, '../templates/common/root/app'));
  fs.renameSync(path.join(__dirname, '../templates/common/root/app', this.config.view.path),
      path.join(__dirname, '../templates/common/root/app/views'));
  fs.renameSync(path.join(__dirname, '../templates/common/root', this.config.test.path),
      path.join(__dirname, '../templates/common/root/test'));
};