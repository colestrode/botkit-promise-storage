var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

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
      expect(storageInterface[level]).to.have.keys(methods);
      methods.forEach(function(method) {
        expect(storageInterface[level][method]().constructor.name).to.equal('Promise');
      });
    });
  });
});
