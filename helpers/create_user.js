"use strict";

const crypto   = require("crypto");
const rando    = require("./random_string");
const passgen  = require("./generate_password");

module.exports = function create(knex, email) {
  let created_at = new Date();

  return passgen("password").then(function(password) {
    return rando(10).then(function(name) {
      return knex("users").insert({email, name, created_at, password});
    });
  });
};
