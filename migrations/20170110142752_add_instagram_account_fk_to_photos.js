
exports.up = function(knex, Promise) {
  return knex.schema.table("instagram_photos", function(table) {
    table.integer("instagram_account").unsigned().references("instagram_accounts.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("instagram_photos", function(table) {
      table.dropForeign("instagram_account");
  }).then(function() {
    return knex.schema.table("instagram_photos", function(table) {
      table.dropColumn("instagram_account");
    });
  });
};
