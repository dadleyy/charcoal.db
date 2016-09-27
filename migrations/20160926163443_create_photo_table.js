exports.up = function(knex, Promise) {
  return knex.schema.createTable("photo", function (table) {
    table.increments();
    table.integer("file").unsigned().references("file.id");
    table.string("label");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("photo");
};
