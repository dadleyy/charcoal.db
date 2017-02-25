"use strict";

const bluebird = require("bluebird");
const rando    = require("./random_string");

module.exports = function create(knex, name) {
  return bluebird.props({
    client_id     : rando(20),
    client_secret : rando(40)
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
