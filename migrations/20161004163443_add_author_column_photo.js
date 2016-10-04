

exports.up = function(knex, Promise) {
  return knex.schema.table("photos", function (table) {
    table.integer("author").unsigned().references("users.id").nullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("photos", function (table) {
    table.dropForeign("author");
  }).then(function() {
    return knex.schema.table("photos", function (table) {
      table.dropColumn("author");
    });
  });
};
