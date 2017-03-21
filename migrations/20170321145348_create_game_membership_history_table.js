
exports.up = function(knex, Promise) {
  return knex.schema.createTable("game_membership_history", function (table) {
    table.increments();
    table.string("uuid", 64); 

    table.integer("user_id")
      .unsigned()
      .references("users.id")
      .notNullable()
      .onDelete("CASCADE");

    table.integer("entry_round_id")
      .unsigned()
      .references("game_rounds.id")
      .notNullable()
      .onDelete("CASCADE");

    table.integer("exit_round_id")
      .unsigned()
      .references("game_rounds.id")
      .nullable()
      .onDelete("CASCADE");

    table.dateTime("deleted_at");
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("game_membership_history");
};
