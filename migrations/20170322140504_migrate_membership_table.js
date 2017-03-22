exports.up = function(knex, Promise) {
  return knex.select("user_id", "game_id", "entry_round_id").from("game_memberships").then(function(results) {
    return knex.insert(results).into("game_membership_history");
  });
};

exports.down = function(knex, Promise) {
  return knex("game_membership_history").del();
};
