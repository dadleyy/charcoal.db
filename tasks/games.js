const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");

module.exports = function(gulp, db_config, argv) {
  gulp.task("games:recalculate-populations", function() {
    let db_client = knex(db_config.production);

    function pouplate(game_id) {
      return db_client("game_memberships").where({ game_id }).count('id').then(function(results) {
        let { 'count(\`id\`)': population } = results[0];
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
