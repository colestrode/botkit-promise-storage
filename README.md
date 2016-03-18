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

### all

Retrieves all data for this scope.

### get

Takes an ID and will return either the data stored with that ID or `undefined`.

### merge

A convenience method not found in the botkit storage modules. Takes an object with an `id` property and will merge it with
any existing data with that ID. If there is no existing data with the given ID, this will function as a `save`. 

Generally, `merge` should be preferred over `save`.

### save

Takes an object with an `id` property and saves it. This will overwrite whatever data is previously stored with this ID.


## Notes

This uses the promises A+ compliant [q](https://github.com/kriskowal/q) library for promises.
