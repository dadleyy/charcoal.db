const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");
const rando    = require("../../helpers/random_string");

module.exports = {

  "client:get-credentials": function(client, argv) {
    let { client: id } = argv;

    if(id >= 1 !== true) {
      throw new Error(`invalid client id: ${argv.client}`);
    }

    function print(results) {
      let [ client ] = results || [ ];

      if(!client) {
        throw new Error(`client ${id} not found`);
      }

      let { client_id, client_secret, redirect_uri } = client;
      let token = new Buffer(`${client_id}:${client_secret}`).toString('base64');

      utils.log(`client #${id}:`);
      utils.log(`   client_id     [${client_id}]`);
      utils.log(`   client_secret [${client_secret}]`);
      utils.log(`   token         [${token}]`);
      utils.log(`   redirect_uri  [${redirect_uri}]`);
    }

    return client("clients").where({ id }).then(print);
  },

  "client:update-credentials": function(client, argv) {
    let { client: id } = argv;

    if(id >= 1 !== true) {
      throw new Error(`invalid client id: ${argv.client}`);
    }

    let { redirectUri: redirect_uri } = argv;

    return bluebird.props({
      client_id     : rando(20),
      client_secret : rando(40)
    }).then(function({ client_id, client_secret }) {
      let updates = { client_id, client_secret };
      let token = new Buffer(`${client_id}:${client_secret}`).toString('base64');

      utils.log(`new client credentials for ${id}:`);
      utils.log(`   client_id     [${updates.client_id}]`);
      utils.log(`   client_secret [${updates.client_secret}]`);
      utils.log(`   token         [${token}]`);

      if(redirect_uri) {
        updates.redirect_uri = redirect_uri;
      }

      if(argv.uuid) {
        updates.uuid = uuid.v1();
        utils.log(utils.colors.yellow(`updating uuid! - new value: ${updates.uuid}`));
      }

      return client("clients").where({ id }).update(updates);
    });
  }

}
