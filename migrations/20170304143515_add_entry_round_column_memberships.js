const COLUMN = "entry_round_id";
const TABLE = "game_memberships";

exports.up = function(knex, Promise) {
  return knex.schema.table(TABLE, function(table) {
    table.integer(COLUMN).unsigned().references("game_rounds.id").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(TABLE, function(table) {
    table.dropForeign(COLUMN);
  }).then(function() {
    return knex.schema.table(TABLE, function(table) {
      table.dropColumn(COLUMN);
    });
  });
};
