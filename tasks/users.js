const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");
const rando    = require("../helpers/random_string");

module.exports = function(gulp, db_config, argv) {

  gulp.task("user:add-role", function() {
    let db_client = knex(db_config.production);
    let { role, user } = argv;

    if(user >= 1 !== true || role >= 1 !== true ) {
      db_client.destroy();
      throw new Error('must provide both valid --user and --role flags');
    }

    function done() {
      db_client.destroy();
    }

    function check(results) {
      let { length } = results;

      if(length >= 1) {
        utils.log(utils.colors.yellow(`user[${user}] already has role[${role}]`));
        return bluebird.resolve(true);
      }

      utils.log(utils.colors.green(`user[${user}] doesn't have role[${role}], adding`));
      return db_client("user_role_mappings").insert({ user, role });
    }

    return db_client("user_role_mappings").where({ user, role }).then(check).finally(done);
  });

  gulp.task("user:get-roles", function() {
    let db_client = knex(db_config.production);
    let { user } = argv;

    if(user >= 1 !== true) {
      db_client.destroy();
      throw new Error(`invalid client id: ${argv.client}`);
    }

    function print(loaded_roles) {
      utils.log(`user #${user} has the following roles:`);

      for(let i = 0, c = loaded_roles.length; i < c; i++) {
        let { id, label } = loaded_roles[i];
        utils.log(`   ${id}: ${label}`);
      }

      return bluebird.resolve(true);
    }

    function getRoles(results) {
      const role_ids = results.map(function({ role }) { return role; });
      return db_client("user_roles").whereIn('id', role_ids).then(print);
    }

    function done() {
      db_client.destroy();
    }

    db_client("user_role_mappings").where({ user }).then(getRoles).finally(done);
  });

}
