exports.up = function(knex, Promise) {
  return knex.schema.createTable("file", function (table) {
    table.increments();
    table.string("key");
    table.string("mime");
    table.enum("status", ["RECEIVED","PERSIST_ERROR","TEMPORARY","PERSISTED","ABANDONED"]);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("file");
};
