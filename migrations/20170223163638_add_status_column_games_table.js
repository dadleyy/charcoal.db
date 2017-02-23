
exports.up = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.enu("status", ["ACTIVE", "ENDED"]).default("ACTIVE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("games", function(table) {
    table.dropColumn("status");
  });
};
