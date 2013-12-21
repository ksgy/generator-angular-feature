'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForStructureType = function askForStructureType() {
  var cb = this.async();

  this.prompt([{
    type: 'list',
    name: 'structureType',
    message: 'How would you like divide your project?',
    choices: [{
      value: 'component',
      name: 'by component'
    }, {
      value: 'feature',
      name: 'by feature'
    }],
    default: 0
  }], function (props) {
    this.copy('config-' + props.structureType + '.json',
        path.join(process.cwd(), 'config.json'));

    cb();
  }.bind(this));
};
