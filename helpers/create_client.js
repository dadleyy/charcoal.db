"use strict";

const crypto   = require("crypto");
const bluebird = require("bluebird");

function key(desired_character_length) {
  var byte_count = desired_character_length * 0.5;
  return new bluebird(function(resolve, reject) {
    crypto.randomBytes(byte_count, function(err, result) {
      resolve(result.toString("hex"));
    });
  });
}

module.exports = function create(knex, name) {
  return bluebird.props({
    client_id     : key(20),
    client_secret : key(40)
  }).then(function(results) {
    console.log(`
    Note: creating miritos client! This information is essential
    for getting started with the api locally.

      client id     : ${results.client_id}
      client secret : ${results.client_secret}
      x-client-auth : ${new Buffer(results.client_id + ":" + results.client_secret).toString("base64")}

    `);
    return knex("clients").insert({
      name          : name,
      client_id     : results.client_id,
      client_secret : results.client_secret,
      created_at    : new Date()
    });
  });
};
