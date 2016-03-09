# botkit-promise-storage
[![Build Status](https://travis-ci.org/colestrode/botkit-promise-storage.svg?branch=master)](https://travis-ci.org/colestrode/botkit-promise-storage)
[![Coverage Status](https://coveralls.io/repos/github/colestrode/botkit-promise-storage/badge.svg?branch=master)](https://coveralls.io/github/colestrode/botkit-promise-storage?branch=master)

Returns a promise-based storage interface for botkit

## Usage

```js
var controller = require('botkit').slackbot();
var promiseStorage = require('botkit-promise-storage')(controller);

promiseStorage.teams.get('teamId')
  .then(function(team) {
    console.log(team);
  })
  .fail(function(err) {
    console.log(err);
  });
```

## Interface

The returned storage object has the same interface as `controller.storage`, except each method returns a promise.

## Notes

This uses the promises A+ compliant [q](https://github.com/kriskowal/q) library for promises.
