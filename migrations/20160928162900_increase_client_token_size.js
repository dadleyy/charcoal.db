
exports.up = function(knex, Promise) {
  return knex.schema.table("client_tokens", function (table) {
    table.dropColumn("token");
  }).then(function() {
    return knex.schema.table("client_tokens", function (table) {
      table.text("token");
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("client_tokens", function (table) {
    table.dropColumn("token"); 
  }).then(function() {
    return knex.schema.table("client_tokens", function (table) {
      table.string("token", 20).unique();
    });
  });
};
