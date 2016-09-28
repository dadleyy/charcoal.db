
exports.up = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.string("redirect_uri");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.dropColumn("redirect_uri");
  });
};
