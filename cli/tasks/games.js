const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");

module.exports = {

  "games:search": function(client) {
    function print() {
    }

    return client("games")
      .leftJoin("users", "users.id", "games.owner_id")
      .select("games.id", "games.uuid", "games.owner_id")
      .then(print);
  },

  "games:prune-deleted-games": function(client) {
     let query = client("game_memberships")
      .leftJoin("games", "games.id", "game_memberships.game_id")
      .whereNotNull("games.deleted_at")
      .whereNotNull("game_memberships.deleted_at")
      .select("game_memberships.id", "game_memberships.user_id", "game_memberships.game_id")

    function prune(results) {
      utils.log(`found ${results.length} memberships that need pruning.`);
      let ids = results.map(function({ id }) { return id; });
      let now = new Date();
      return client("game_memberships").whereIn("id", ids).update({ deleted_at: now }).then(finish);
    }

    utils.log(utils.colors.white(`executing: ${utils.colors.green(query.toSQL().sql)}`));

    return query.then(prune);
  },

  "games:recalculate-populations": function(client) {
    let query = client("games").where({ deleted_at: null }).pluck("id");

    function pouplate(game_id) {
      return client("game_memberships").where({ game_id }).count("id").then(function(results) {
        let { "count(\`id\`)": population } = results[0];
        return client("games").where({ id: game_id }).update({ population });
      });
    }

    function members(game_ids) {
      return bluebird.map(game_ids, pouplate);
    }

    return query.then(members);
  }

};
