exports.up = function(knex, Promise) {
  return knex.schema.createTable("client_admins", function (table) {
    table.increments()
    table.integer("user").unsigned().references("users.id");
    table.integer("client").unsigned().references("clients.id");
    table.timestamps();
    table.dateTime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("client_admins");
};
