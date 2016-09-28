exports.up = function(knex, Promise) {
  return knex.schema.createTable("file", function (table) {
    table.increments();
    table.string("key");
    table.string("mime");
    table.enum("status", ["TEMPORARY","OWNED","ABANDONDED"]);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("file");
};
