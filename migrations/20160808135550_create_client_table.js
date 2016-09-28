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

exports.up = function(knex, Promise) {
  return knex.schema.createTable("clients", function (table) {
    table.increments()
    table.string("name").unique();
    table.string("client_id", 20).unique();
    table.string("client_secret", 40).unique();
    table.timestamps();
    table.dateTime("deleted_at");
  }).then(function() {
    return bluebird.props({
      client_id     : key(20),
      client_secret : key(40)
    }).then(function(results) {
      console.log(`
      Note: creating caap client! This information is essential
      for getting started with the api locally.

        client id     : ${results.client_id}
        client secret : ${results.client_secret}

      `);
      return knex("clients").insert({
        name          : "caap",
        client_id     : results.client_id,
        client_secret : results.client_secret,
        created_at    : new Date()
      });
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clients");
};
