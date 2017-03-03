const random = require("../helpers/random_string");
const COLUMN = "username";
const TABLE = "users";

exports.up = function(knex, Promise) {
  return knex.schema.table(TABLE, function(table) {
    table.string(COLUMN).unique();
  }).then(function() {
    return knex.table(TABLE).where({ name: null }).pluck("id");
  }).then(function(games) {
    return knex.transaction(function(trx) {
      return Promise.map(games, function(id) {
        return random(20).then(function(username) {
          return knex.table(TABLE).where({ id }).update({ username });
        });
      });
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(TABLE, function(table) {
    table.dropColumn(COLUMN);
  });
};
