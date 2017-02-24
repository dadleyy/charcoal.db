
exports.up = function(knex, Promise) {
  return knex.schema.createTable("game_rounds", function (table) {
    table.increments();
    table.string("uuid", 64); 
    table.dateTime("deleted_at");
    table.integer("game").unsigned().references("games.id").notNullable();
    table.integer("president_id").unsigned().references("users.id").nullable();
    table.integer("vice_president_id").unsigned().references("users.id").nullable();
    table.integer("asshole_id").unsigned().references("users.id").nullable();
    table.timestamps()
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("game_rounds");
};
