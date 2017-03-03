const random = require("../helpers/random_string");
const COLUMN = "name";

exports.up = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.string(COLUMN);
  }).then(function() {
    return knex.table("games").where({ name: null }).pluck("id");
  }).then(function(games) {
    return knex.transaction(function(trx) {
      return Promise.map(games, function(id) {
        return random(20).then(function(name) {
          return knex.table("games").where({ id }).update({ name });
        });
      });
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.dropColumn(COLUMN);
  });
};
