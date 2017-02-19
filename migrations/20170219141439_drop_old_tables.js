
exports.up = function(knex, Promise) {
  function instagram() {
    return knex.schema.dropTable('instagram_accounts').then();
  }

  return knex.schema.dropTable('instagram_photos').then(instagram);
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable("instagram_photos", function (table) {
    table.increments()
    table.string("instagram_id").unique();
    table.string("caption");
    table.string("owner");
    table.string("uuid", 64); 
    table.integer("photo").unsigned().references("photos.id").notNullable();
    table.integer("client").unsigned().references("clients.id");
    table.dateTime("deleted_at");
    table.timestamps()
  }).then(function() {
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
  }).then(function() {
    return knex.schema.table("instagram_photos", function(table) {
      table.integer("instagram_account").unsigned().references("instagram_accounts.id");
    });
  }).then(function() {
    return knex.schema.table("instagram_photos", function(table) { table.index("uuid"); });
  });
};
