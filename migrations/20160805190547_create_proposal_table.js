
exports.up = function(knex, Promise) {
  return knex.schema.createTable("proposals", function (table) {
    table.increments()
    table.string("summary")
    table.text("content")
    table.integer("author").unsigned().references("users.id").notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("proposals");
};
