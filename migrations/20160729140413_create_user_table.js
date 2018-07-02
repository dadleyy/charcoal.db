
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function (table) {
    table.increments()
    table.string("name")
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return new Promise((resolve) => resolve(knex.schema.dropTable("users")));
};
