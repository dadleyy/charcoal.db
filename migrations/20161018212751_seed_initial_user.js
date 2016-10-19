"use strict";

const create = require("../helpers/create_user");
const jwt    = require("../helpers/jwt");

exports.up = function(knex, Promise) {
  return create(knex, "admin@miritos.com").then(function() {
    return knex("client_admins").insert({user: 1, client: 1});
  }).then(function() {
    return jwt({user: 1, client: 1}).then(function(token) {
      return knex("client_tokens").insert({user: 1, client: 1, token});
    }).catch(function(e) {
      console.error(e);
      return e;
    });
  });
};

exports.down = function(knex, Promise) {
  return knex("client_admins").where({id: 1}).del().then(function() {
    return knex("client_tokens").where({id: 1}).del();
  }).then(function() {
    return knex("users").where({id: 1}).del();
  });
};
