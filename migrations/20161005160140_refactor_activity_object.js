
exports.up = function(knex, Promise) {
  return knex.schema.table("activity", function (table) {
    table.dropForeign("actor");
    table.dropForeign("object");
    table.dropForeign("created_by");
  }).then(function() {
    return knex.schema.table("activity", function (table) {
      table.dropColumn("actor");
      table.dropColumn("object");
      table.dropColumn("created_by");

      table.text("actor_url");
      table.string("actor_type");
      table.string("object_type");
      table.text("object_url");
    });
  }).then(function() {
    return knex.schema.dropTable("objects");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("display_schedule").then(function() {
    return knex.schema.dropTable("activity").then(function() {
      return knex.schema.createTable("object", function (table) {
        table.increments();
        table.string("type");
        table.string("url");
        table.string("name");
        table.integer("created_by").unsigned().references("clients.id");
        table.timestamps();
      }).then(function() {
        return knex.schema.renameTable("object", "objects");
      });
    }).then(function() {
      return knex.schema.createTable("activity", function (table) {
        table.increments();
        table.integer("actor").unsigned().references("objects.id");
        table.integer("object").unsigned().references("objects.id");
        table.integer("created_by").unsigned().references("objects.id");
        table.datetime("deleted_at");
        table.timestamps();
      });
    });
  }).then(function() {
    return knex.schema.createTable("display_schedule", function (table) {
      table.increments();
      table.integer("activity").unsigned().references("activity.id");
      table.datetime("start");
      table.datetime("end");
      table.timestamps();
      table.enu("approval", [
        "APPROVED", 
        "REJECTED", 
        "PENDING"
      ]).defaultTo("PENDING").notNullable();
    });
  });
};
