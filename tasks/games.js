const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");

module.exports = function(gulp, db_config, argv) {
  gulp.task("games:prune-deleted-games", function() {
    let db_client = knex(db_config.production);

    function finish() {
      db_client.destroy();
    }

    function prune(results) {
      utils.log(`found ${results.length} memberships that need pruning.`);
      let ids = results.map(function({ id }) { return id; });
      let now = new Date();
      return db_client("game_memberships").whereIn("id", ids).update({ deleted_at: now }).then(finish);
    }

     let query = db_client("game_memberships")
      .leftJoin("games", "games.id", "game_memberships.game_id")
      .whereNotNull("games.deleted_at")
      .whereNotNull("game_memberships.deleted_at")
      .select("game_memberships.id", "game_memberships.user_id", "game_memberships.game_id")

    utils.log(utils.colors.white(`executing: ${utils.colors.green(query.toSQL().sql)}`));

    return db_client("game_memberships")
      .leftJoin("games", "games.id", "game_memberships.game_id")
      .whereNotNull("games.deleted_at")
      .whereNull("game_memberships.deleted_at")
      .select("game_memberships.id", "game_memberships.user_id", "game_memberships.game_id")
      .then(prune);
  });

  gulp.task("games:recalculate-populations", function() {
    let db_client = knex(db_config.production);

    function pouplate(game_id) {
      return db_client("game_memberships").where({ game_id }).count("id").then(function(results) {
        let { "count(\`id\`)": population } = results[0];
        return db_client("games").where({ id: game_id }).update({ population });
      });
    }

    function members(game_ids) {
      return bluebird.map(game_ids, pouplate);
    }

    function done() {
      db_client.destroy();
    }

    return db_client("games").where({ deleted_at: null }).pluck("id").then(members).finally(done);
  });
};
