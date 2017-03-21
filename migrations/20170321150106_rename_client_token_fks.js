
exports.up = function(knex, Promise) {
  return knex.schema.table("client_tokens", function (table) {
    table.renameColumn("client", "client_id");
    table.renameColumn("user", "user_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("client_tokens", function (table) {
    table.renameColumn("client_id", "client");
    table.renameColumn("user_id", "user");
  });
};
