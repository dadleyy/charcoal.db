
exports.up = function(knex, Promise) {
  return knex.schema.table("proposals", function (table) {
    table.dateTime("deleted_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("proposals", function (table) {
    table.dropColumn("deleted_at");
  });
};
