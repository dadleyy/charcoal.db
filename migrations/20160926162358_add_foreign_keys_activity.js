exports.up = function(knex, Promise) {
   return knex.schema.table("activity", function (table) {
    table.foreign("actor").references("object.id");
    table.foreign("object").references("object.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("activity", function (table) {
    table.dropForeign("actor");
    table.dropForeign("object");
  });
};
