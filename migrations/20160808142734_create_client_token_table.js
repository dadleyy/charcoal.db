
exports.up = function(knex, Promise) {
  return knex.schema.createTable("client_tokens", function (table) {
    table.string("token", 15).unique();
    table.integer("client").unsigned().references("clients.id").notNullable();
    table.integer("user").unsigned().references("users.id").notNullable();
    table.dateTime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("client_tokens");
};
