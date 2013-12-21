'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var Config = require('../config.js');


var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);

  // Get configuration
  if (typeof(this.options['config']) === 'undefined')
    this.configObj = Config.getConfig({
      path: '',
      file: 'config.json'
    });
  else
    this.configObj = this.options['config'];

  this.hookFor('angular-feature:controller');
  this.hookFor('angular-feature:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
  var coffee = this.env.options.coffee;
  var config = {
    file: path.join(
      this.env.options.appPath,
      this.configObj.source.path,
      'app.' + (coffee ? 'coffee' : 'js')
    ),
    needle: '.otherwise',
    splicable: [
      "  templateUrl: '" + this.configObj.view.path + "/" + this.name.toLowerCase() + ".html'" + (coffee ? "" : "," ),
      "  controller: '" + this.classedName + "Ctrl'"
    ]
  };

  if (coffee) {
    config.splicable.unshift(".when '/" + this.name + "',");
  }
  else {
    config.splicable.unshift(".when('/" + this.name + "', {");
    config.splicable.push("})");
  }

  angularUtils.rewriteFile(config);
};
