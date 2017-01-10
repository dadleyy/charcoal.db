exports.up = function(knex, Promise) {
  return knex.schema.createTable("instagram_accounts", function (table) {
    table.increments();
    table.string("uuid", 64).unique();

    table.integer("user").unsigned().references("users.id");

    table.string("instagram_id");
    table.string("username");

    table.datetime("deleted_at");

    table.index("uuid");
    table.timestamps();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("instagram_accounts");
};
