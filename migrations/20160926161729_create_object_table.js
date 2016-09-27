exports.up = function(knex, Promise) {
  return knex.schema.createTable("object", function (table) {
    table.increments();
    table.string("type");
    table.string("url");
    table.string("name");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("object");
};
