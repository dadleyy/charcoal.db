
exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", function (table) {

    table.increments();
    table.string("uuid", 64); 
    table.dateTime("deleted_at");
    table.integer("owner").unsigned().references("users.id").notNullable();
    table.timestamps();

  }).then(function() {
    return knex.schema.createTable("game_memberships", function (table) {

      table.increments();
      table.string("uuid", 64); 
      table.dateTime("deleted_at");
      table.integer("game").unsigned().references("games.id").notNullable();
      table.integer("user").unsigned().references("users.id").notNullable();
      table.timestamps()

    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("game_memberships").then(function() {
    return knex.schema.dropTable("games");
  });
};
