
exports.up = function(knex, Promise) {
  return knex.schema.table("games", function (table) {
    table.renameColumn("owner", "owner_id");
  }).then(function() {
    return knex.schema.table("game_memberships", function (table) {
      table.renameColumn("user", "user_id");
      table.renameColumn("game", "game_id");
    });
  });
};

exports.down = function(knex, Promise) {

  return knex.schema.table("games", function (table) {
    table.renameColumn("owner_id", "owner");
  }).then(function() {
    return knex.schema.table("game_memberships", function (table) {
      table.renameColumn("user_id", "user");
      table.renameColumn("game_id", "game");
    });
  });
};
