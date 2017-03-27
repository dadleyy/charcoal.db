exports.up = function(knex, Promise) {
  return knex.schema.table("game_memberships", function(table) {
    table.integer("presidencies");
    table.integer("vice_presidencies");
    table.integer("assholeships");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("game_memberships", function(table) {
    table.dropColumn("presidencies");
    table.dropColumn("vice_presidencies");
    table.dropColumn("assholeships");
  });
};
