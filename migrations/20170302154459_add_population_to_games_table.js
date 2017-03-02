const COLUMN = "population";

exports.up = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.integer(COLUMN).defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.dropColumn(COLUMN);
  });
};
