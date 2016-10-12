"use strict";

const create = require("../helpers/create_client");

exports.up = function(knex, Promise) {
  return create(knex, "miritos.second");
};

exports.down = function(knex, Promise) {
  return knex("clients").where({id: 2}).del();
};
