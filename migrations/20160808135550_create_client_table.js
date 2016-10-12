"use strict";

const create = require("../helpers/create_client");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("clients", function (table) {
    table.increments()
    table.string("name").unique();
    table.string("client_id", 20).unique();
    table.string("client_secret", 40).unique();
    table.timestamps();
    table.dateTime("deleted_at");
  }).then(function() {
    return create(knex, "miritos.ui");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("clients");
};
