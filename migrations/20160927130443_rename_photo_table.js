exports.up = function(knex, Promise) {
  return knex.schema.renameTable("photo", "photos");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("photos", "photo");
};
