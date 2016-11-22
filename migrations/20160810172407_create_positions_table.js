
exports.up = function(knex, Promise) {
  return knex.schema.createTable("positions", function (table) {
    table.increments()
    table.integer("location");
    table.integer("user").unsigned().references("users.id").notNullable();
    table.integer("proposal").unsigned().references("proposals.id").notNullable();
    table.dateTime("deleted_at");
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("positions");
};
