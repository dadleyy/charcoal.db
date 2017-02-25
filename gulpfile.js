const gulp     = require("gulp");
const argv     = require("yargs").argv;
const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");
const rando    = require("./helpers/random_string");

const db_config = require("./knexfile");

gulp.task("client:update-credentials", function() {
  let db_client = knex(db_config.production);
  let { client: id } = argv;

  if(id >= 1 !== true) {
    db_client.destroy();
    throw new Error(`invalid client id: ${argv.client}`);
  }

  let { redirectUri: redirect_uri } = argv;

  return bluebird.props({
    client_id     : rando(20),
    client_secret : rando(40)
  }).then(function({ client_id, client_secret }) {
    let updates = { client_id, client_secret };

    utils.log(`new client id for ${id}: ${updates.client_id}, secret: ${updates.client_secret}`);

    if(redirect_uri) {
      updates.redirect_uri = redirect_uri;
    }

    if(argv.uuid) {
      updates.uuid = uuid.v1();
      utils.log(utils.colors.yellow(`updating uuid! - new value: ${updates.uuid}`));
    }

    return db_client("clients").where({ id }).update(updates);
  }).then(function() {
    db_client.destroy();
  });
});
