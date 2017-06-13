
exports.up = function(knex, Promise) {
  return knex.schema.table("user_role_mappings", function (table) {
    table.renameColumn("role", "role_id");
    table.renameColumn("user", "user_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("user_role_mappings", function (table) {
    table.renameColumn("role_id", "role");
    table.renameColumn("user_id", "user");
  });
};
