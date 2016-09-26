exports.up = function(knex, Promise) {
  return knex.schema.createTable("activity", function (table) {
    table.increments()
    table.string("type")
    table.integer("actor")
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("activity");
};
