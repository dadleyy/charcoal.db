exports.up = function(knex, Promise) {
  return knex.schema.createTable("instagram_photos", function (table) {
    table.increments()
    table.string("instagram_id").unique();
    table.string("caption");
    table.string("owner");
    table.integer("photo").unsigned().references("photos.id").notNullable();
    table.integer("client").unsigned().references("clients.id");
    table.dateTime("deleted_at");
    table.timestamps()
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("instagram_photos");
};
