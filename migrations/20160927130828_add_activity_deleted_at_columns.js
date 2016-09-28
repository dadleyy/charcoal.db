
exports.up = function(knex, Promise) {
  return knex.schema.table("activity", function (table) {
    table.datetime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("activity", function (table) {
    table.dropColumn("deleted_at");
  });
};

