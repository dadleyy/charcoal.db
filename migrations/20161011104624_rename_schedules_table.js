exports.up = function(knex, Promise) {
  return knex.schema.renameTable("display_schedule", "display_schedules");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("display_schedules", "display_schedule");
};
