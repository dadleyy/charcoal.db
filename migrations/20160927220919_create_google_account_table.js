exports.up = function(knex, Promise) {
  return knex.schema.createTable("google_accounts", function (table) {
    table.increments();
    table.integer("user").unsigned().references("users.id");
    table.string("google_id");
    table.string("access_token");
    table.datetime("deleted_at");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("google_accounts");
};
