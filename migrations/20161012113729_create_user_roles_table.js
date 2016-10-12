
exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_roles", function (table) {
    table.increments()
    table.string("label")
    table.string("description")
    table.timestamps();
    table.dateTime("deleted_at");
  }).then(function() {
    return knex("user_roles").insert([
      {label: "admin", description: "admin users are able to manage other user roles and approve schedules"},
      {label: "contributor", description: "contributors are able to create new activity items"}
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_roles");
};
