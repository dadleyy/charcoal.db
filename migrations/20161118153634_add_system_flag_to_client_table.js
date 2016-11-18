
exports.up = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.boolean("system");
  }).then(function() {
    return knex("clients").where("id", "=", 1).update({system: true});
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.dropColumn("system");
  });
};
