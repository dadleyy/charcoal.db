exports.up = function(knex, Promise) {
  return knex.schema.createTable("position_history", function (table) {
    table.increments()
    table.integer("user").unsigned().references("users.id").notNullable();
    table.integer("proposal").unsigned().references("proposals.id").notNullable();
    table.integer("before");
    table.integer("after");
    table.dateTime("deleted_at");
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("position_history");
};
