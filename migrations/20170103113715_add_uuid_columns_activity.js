
exports.up = function(knex, Promise) {
  return knex.schema.table("activity", function(table) { 
    table.string("actor_uuid", 64);
    table.string("object_uuid", 64);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("activity", function(table) { 
    table.dropColumn("actor_uuid");
    table.dropColumn("object_uuid");
  });
};
