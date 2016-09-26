
exports.up = function(knex, Promise) {
  return knex.schema.table("users", function (table) {
    table.dateTime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("deleted_at");
  });
};
