
exports.up = function(knex, Promise) {
  return knex.schema.table("photos", function (table) {
    table.integer("height");
    table.integer("width");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("photos", function (table) {
    table.dropColumn("height");
    table.dropColumn("width");
  });
};
