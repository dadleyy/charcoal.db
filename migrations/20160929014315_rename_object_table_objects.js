
exports.up = function(knex, Promise) {
  return knex.schema.renameTable("object", "objects");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("objects", "object");
};
