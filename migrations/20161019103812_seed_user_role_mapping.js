
exports.up = function(knex, Promise) {
  return knex("user_role_mappings").insert({
    user: 1,
    role: 1
  });
};

exports.down = function(knex, Promise) {
  return knex("user_role_mappings").where({
    user: 1,
    role: 1
  }).del().then(function() {
    return knex("photos").where({author: 1}).del();
  });
};
