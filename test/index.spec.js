var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var q = require('q');

require('sinon-as-promised')(q);
chai.use(require('sinon-chai'));

describe('Storage', function() {
  var storageInterface;
  var controllerMock;

  beforeEach(function() {
    controllerMock = {
      storage: {
        teams: {
          all: sinon.stub().yields(null),
          get: sinon.stub().yields(null),
          save: sinon.stub().yields(null)
        },
        channels: {
          all: sinon.stub().yields(null),
          get: sinon.stub().yields(null),
          save: sinon.stub().yields(null)
        },
        users: {
          all: sinon.stub().yields(null),
          get: sinon.stub().yields(null),
          save: sinon.stub().yields(null)
        }
      }
    };

    storageInterface = require('../index')(controllerMock);
  });


  it('should export a promisified storage interface from the controller', function() {
    var levels = Object.keys(controllerMock.storage);
    var methods = Object.keys(controllerMock.storage[levels[0]]);

    levels.forEach(function(level) {
      expect(storageInterface[level]).to.exist;
      expect(storageInterface[level]).to.contain.keys(methods);
      methods.forEach(function(method) {
        expect(storageInterface[level][method]().constructor.name).to.equal('Promise');
      });
    });
  });

  describe('merge', function() {
    var levels;

    beforeEach(function() {
      levels = Object.keys(controllerMock.storage);

      levels.forEach(function(level) {
        sinon.stub(storageInterface[level], 'get').returns(q({existing: 'data'}));
        sinon.stub(storageInterface[level], 'save').returns(q());
      });
    });

    afterEach(function() {
      levels.forEach(function(level) {
        storageInterface[level].get.restore();
        storageInterface[level].save.restore();
      });
    });

    it('should export a merge method to get and save', function() {
      var promises = [];

      levels.forEach(function(level) {
        promises.push(
          storageInterface[level].merge({id: 'heisenberg', name: 'walter'})
            .then(function() {
              expect(storageInterface[level].get).to.have.been.calledWith('heisenberg');
              expect(storageInterface[level].save).to.have.been.calledWith({id: 'heisenberg', name: 'walter', existing: 'data'});
            })
        );
      });

      return q.all(promises);
    });
  });
});
