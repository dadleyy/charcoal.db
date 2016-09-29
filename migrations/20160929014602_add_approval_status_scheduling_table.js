
exports.up = function(knex, Promise) {
  return knex.schema.table("display_schedule", function (table) {
    table.enu("approval", [
      "APPROVED", 
      "REJECTED", 
      "PENDING"
    ]).defaultTo("PENDING").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("display_schedule", function (table) {
    table.dropColumn("approval");
  });
};
