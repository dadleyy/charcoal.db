
exports.up = function(knex, Promise) {
  return knex.schema.table("game_rounds", function(table) {
    table.renameColumn("game", "game_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("game_rounds", function(table) {
    table.renameColumn("game_id", "game");
  });
};
