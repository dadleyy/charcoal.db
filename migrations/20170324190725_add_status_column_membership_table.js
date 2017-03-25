exports.up = function(knex, Promise) {
  return knex.schema.table("game_memberships", function (table) {
    table.enu("status", ["ACTIVE", "INACTIVE"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("game_memberships", function (table) {
    table.dropColumn("status");
  });
};
