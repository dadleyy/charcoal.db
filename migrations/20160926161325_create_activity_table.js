exports.up = function(knex, Promise) {
  return knex.schema.createTable("activity", function (table) {
    table.increments();
    table.string("type");
    table.integer("actor").unsigned();
    table.integer("object").unsigned();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("activity");
};
