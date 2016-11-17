exports.up = function(knex, Promise) {
  return knex.schema.createTable("system_settings", function (table) {
    table.increments();
    table.boolean("restricted_email_domains");
    table.dateTime("deleted_at");
    table.timestamps();
  }).then(function() {
    return knex.schema.createTable("system_email_domains", function (table) {
      table.increments();
      table.string("domain");
      table.timestamps();
      table.dateTime("deleted_at");
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("system_settings").then(function() {
    return knex.schema.dropTable("system_email_domains");
  });
};
