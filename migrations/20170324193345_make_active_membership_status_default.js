
exports.up = function(knex, Promise) {
  return knex.schema.raw("ALTER TABLE game_memberships ALTER COLUMN status SET DEFAULT 'ACTIVE'");
};

exports.down = function(knex, Promise) {
  return new Promise((resolve) => resolve());
};
