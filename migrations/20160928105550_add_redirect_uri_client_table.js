
exports.up = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.string("redirect_uri");
  }).then(function() {
    return knex("clients").where("id", "=", 1).update({
      redirect_uri: "http://local.ui.caap.oiq.io:8888/oauth/google"
    }).then(function() {
      console.log(`
      Note: updated miritos client #1 redirect_uri to: "http://local.ui.caap.oiq.io:8888/oauth/google"
      
      `);
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("clients", function (table) {
    table.dropColumn("redirect_uri");
  });
};
