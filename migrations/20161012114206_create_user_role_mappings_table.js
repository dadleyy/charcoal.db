
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_role_mappings", function (table) {
    table.increments()
    table.integer("user").unsigned().references("users.id");
    table.integer("role").unsigned().references("user_roles.id");
    table.timestamps();
    table.dateTime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_role_mappings");
};
