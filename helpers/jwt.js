"use strict";

const fs       = require("fs");
const path     = require("path");
const bluebird = require("bluebird");
const jwt      = require("jsonwebtoken");

const KEY_PATH = path.join(__dirname, "../.keys/private.pem");

function defer() {
  let deferred = {};

  deferred.promise = new bluebird(function(resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject  = reject;
  });

  return deferred;
}

module.exports = function generate(payload) {
  let deferred = defer();

  function haveKey(err, buffer ) {
    if(err)
      return deferred.reject(err);

    jwt.sign(payload, buffer, {algorithm: "RS512"}, function(err, token) {
      if(err)
        return deferred.reject(err);

      deferred.resolve(token);
    });
  }

  fs.readFile(KEY_PATH, haveKey);

  return deferred.promise;
};
