/* adding email and name columns here in the event that
 * an activity publisher needs to directly create an 
 * activity who's actor is a google account object without
 * the person having authenticated. this will allow the
 * application to reconcile this information later.
 */
exports.up = function(knex, Promise) {
  return knex.schema.table("google_accounts", function (table) {
    table.string("email");
    table.string("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("google_accounts", function (table) {
    table.dropColumn("email");
    table.dropColumn("name");
  });
};
