var q = require('q');
var _ = require('lodash');

module.exports = function(controller) {
  var promiseInterface = {};

  _.forOwn(controller.storage, function(level, levelName) {
    promiseInterface[levelName] = {};

    _.forOwn(level, function(method, methodName) {
      promiseInterface[levelName][methodName] = q.nbind(method, level);
    });
  });

  return promiseInterface;
};
