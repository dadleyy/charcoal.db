
exports.up = function(knex, Promise) {
  return knex.schema.table("instagram_photos", function(table) {
    table.dropColumn("caption");
  }).then(function() {
    return knex.schema.table("instagram_photos", function(table) {
      table.text("caption");
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("instagram_photos", function(table) {
    table.dropColumn("caption");
  }).then(function() {
    return knex.schema.table("instagram_photos", function(table) {
      table.string("caption");
    });
  });
};
