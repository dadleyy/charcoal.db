const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");
const table    = require("easy-table");

module.exports = {

  "game:print-memberships": function(client, argv) {
    let { game } = argv;

    if(!game) {
      throw new Error("invalid game id");
    }

    function print(memberships) {
      let t = new table();

      if(memberships.length === 0) {
        return utils.log("empty game");
      }

      for(let i = 0, c = memberships.length; i < c; i++) {
        let { id, name, username, status } = memberships[i];

        t.cell("id", id);
        t.cell("status", status);
        t.cell("name", name);
        t.cell("username", username);
        t.newRow()
      }

      utils.log(`\n${t.toString()}`);
    }

    return client("game_memberships")
      .leftJoin("games", "games.id", "game_memberships.game_id")
      .leftJoin("users", "users.id", "game_memberships.user_id")
      .select(
        "game_memberships.id as id",
        "users.name as name",
        "users.username as username",
        "game_memberships.status as status"
      ).where({ "games.id": game })
      .then(print);
  },

  "games:search": function(client) {
    const query =  client("games")
      .leftJoin("users", "users.id", "games.owner_id")
      .select(
        "games.id as id",
        "games.uuid as uuid",
        "games.status as status",
        "games.population as population",
        "users.name as user_name"
      ).limit(20)

    function print(games) {
      let t = new table();

      if(games.length === 0) {
        return utils.log("no games found");
      }

      for(let i = 0, c = games.length; i < c; i++) {
        let { id, uuid, population, status, user_name } = games[i];

        t.cell("id", id);
        t.cell("uuid", uuid);
        t.cell("status", status);
        t.cell("creator", user_name);
        t.cell("population", population);
        t.newRow()
      }

      utils.log(`\n${t.toString()}`);
    }

    return query.then(print);
  },

  "games:clean-empty-games": function(client) {
    let query = client("games")
      .where({ population: 0 });

    function finished(count) {
      utils.log(`cleaned ${count} games`);
    }

    return query.del().then(finished);
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
      return client("game_memberships").whereIn("id", ids).update({ deleted_at: now });
    }

    utils.log(utils.colors.white(`executing: ${utils.colors.green(query.toSQL().sql)}`));

    return query.then(prune);
  },

  "games:recalculate-populations": function(client) {
    let query = client("games").where({ deleted_at: null }).pluck("id");

    function pouplate(game_id) {
      let count = client("game_memberships")
        .where({ game_id, status: "ACTIVE" })
        .count("id as population");

      function save(results) {
        let { population } = results[0];
        return client("games").where({ id: game_id }).update({ population });
      }

      return count.then(save);
    }

    function members(game_ids) {
      return bluebird.map(game_ids, pouplate);
    }

    return query.then(members);
  }

};
