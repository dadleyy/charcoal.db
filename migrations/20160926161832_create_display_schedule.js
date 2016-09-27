exports.up = function(knex, Promise) {
  return knex.schema.createTable("display_schedule", function (table) {
    table.increments();
    table.integer("activity").unsigned().references("activity.id");
    table.datetime("start");
    table.datetime("end");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("display_schedule");
};
