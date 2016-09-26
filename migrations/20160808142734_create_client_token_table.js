
exports.up = function(knex, Promise) {
  return knex.schema.createTable("client_tokens", function (table) {
    table.increments()
    table.string("token", 20).unique();
    table.integer("client").unsigned().references("clients.id").notNullable();
    table.integer("user").unsigned().references("users.id").notNullable();
    table.dateTime("deleted_at");
    table.timestamps()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("client_tokens");
};
