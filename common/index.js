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
  if (this.config.structure.type === 'feature') {
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src/common/views'),
        path.join(__dirname, '../templates/common/root/feature/app/src/common', this.config.view.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src/common/test'),
        path.join(__dirname, '../templates/common/root/feature/app/src/common', this.config.test.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src/common'),
        path.join(__dirname, '../templates/common/root/feature/app/src', this.config.common.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src'),
        path.join(__dirname, '../templates/common/root/feature/app', this.config.source.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app'),
        path.join(__dirname, '../templates/common/root/feature', this.config.app.path));
  }
  else {
    fs.renameSync(path.join(__dirname, '../templates/common/root/component/app/views'),
        path.join(__dirname, '../templates/common/root/component/app', this.config.view.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/component/app'),
        path.join(__dirname, '../templates/common/root/component', this.config.app.path));
    fs.renameSync(path.join(__dirname, '../templates/common/root/component/test'),
        path.join(__dirname, '../templates/common/root/component', this.config.test.path));
  }
};

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/common/root'));
  if (this.config.structure.type === 'feature')
    this.directory('feature', '.', true);
  else
    this.directory('component', '.', true);
};

Generator.prototype.rollbackRename = function rollbackRename() {
  if (this.config.structure.type === 'feature') {
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature', this.config.app.path),
        path.join(__dirname, '../templates/common/root/feature/app'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app', this.config.source.path),
        path.join(__dirname, '../templates/common/root/feature/app/src'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src', this.config.common.path),
        path.join(__dirname, '../templates/common/root/feature/app/src/common'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src/common', this.config.view.path),
        path.join(__dirname, '../templates/common/root/feature/app/src/common/views'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/feature/app/src/common', this.config.test.path),
        path.join(__dirname, '../templates/common/root/feature/app/src/common/test'));
  }
  else {
    fs.renameSync(path.join(__dirname, '../templates/common/root/component', this.config.app.path),
        path.join(__dirname, '../templates/common/root/component/app'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/component/app', this.config.view.path),
        path.join(__dirname, '../templates/common/root/component/app/views'));
    fs.renameSync(path.join(__dirname, '../templates/common/root/component', this.config.test.path),
        path.join(__dirname, '../templates/common/root/component/test'));
  }
};