const fs       = require("fs");
const utils    = require("gulp-util");
const uuid     = require("node-uuid");
const knex     = require("knex");
const crypto   = require("crypto");
const bluebird = require("bluebird");
const table    = require("easy-table");
const rando    = require("../../helpers/random_string");

module.exports = {
  
  "users:seed": function(client, argv) {
    let { file } = argv;

    if(!file) {
      throw new Error("invalid file");
    }

    function finish() {
      utils.log('done');
    }

    function create({ email, username, name}) {
      let record = { email, username, name, uuid: uuid.v1() };

      function check({ length: count }) {
        if(count !== 0) {
          utils.log(utils.colors.yellow(`unable to seed user, email[${email}] already taken`));
          return bluebird.resolve(true);
        }

        return client("users").insert(record);
      }

      return client("users").where({ email }).select('id').then(check);
    }

    function loaded(buffer) {
      try {
        let data = JSON.parse(buffer.toString("utf-8"));
        return bluebird.map(data, create).then(finish);
      } catch(e) {
        return bluebird.reject(e);
      }
    }

    return bluebird.promisify(fs.readFile)(file).then(loaded);
  },

  "users:search": function(client, argv) {
    let { page } = argv;

    function print(users) {
      if(users.length == 0) {
        utils.log(`no users found.`);
        return bluebird.resolve(true);
      }

      let t = new table();
      for(let i = 0, c = users.length; i < c; i++) {
        let { id, email, name, username } = users[i];
        t.cell("id", id);
        t.cell("email", email);
        t.cell("username", username);
        t.cell("name", name);
        t.newRow()
      }

      utils.log(`\n${t.toString()}`);
    }

    return client("users").whereNull("deleted_at").limit(20).offset(20 * (page || 0)).then(print);
  },

  "user:add-role": function(client, argv) {
    let { role, user } = argv;

    if(user >= 1 !== true || role >= 1 !== true ) {
      throw new Error('must provide both valid --user and --role flags');
    }

    function check(results) {
      let { length } = results;

      if(length >= 1) {
        utils.log(utils.colors.yellow(`user[${user}] already has role[${role}]`));
        return bluebird.resolve(true);
      }

      utils.log(utils.colors.green(`user[${user}] doesn't have role[${role}], adding`));
      return client("user_role_mappings").insert({ user, role });
    }

    return client("user_role_mappings").where({ user, role }).then(check);
  },

  "user:get-roles": function(client, argv) {
    let { user } = argv;

    if(user >= 1 !== true) {
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
      return client("user_roles").whereIn('id', role_ids).then(print);
    }

    client("user_role_mappings").where({ user }).then(getRoles);
  }

};
