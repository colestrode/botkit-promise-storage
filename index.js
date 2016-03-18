var q = require('q');
var _ = require('lodash');

module.exports = function(controller) {
  var promiseInterface = {};

  _.forOwn(controller.storage, function(level, levelName) {
    var levelInterface = {};

    promiseInterface[levelName] = levelInterface;

    _.forOwn(level, function(method, methodName) {
      promiseInterface[levelName][methodName] = q.nbind(method, level);
    });

    levelInterface.merge = function(data) {
      return levelInterface.get(data.id)
        .then(function(existingData) {
          levelInterface.save(_.merge({}, existingData, data));
        });
    };
  });

  return promiseInterface;
};
