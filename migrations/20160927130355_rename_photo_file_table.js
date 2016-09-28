exports.up = function(knex, Promise) {
  return knex.schema.renameTable("file", "files");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("files", "file");
};
