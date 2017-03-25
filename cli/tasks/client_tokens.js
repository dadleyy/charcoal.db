const utils = require("gulp-util");
const table = require("../helpers/print_table");
const jwt   = require("../helpers/jwt");

module.exports = {

  "client-tokens:generate": function(client, argv) {
    let { user, client: client_id, keyfile } = argv;

    if(!user || !client || !keyfile) {
      throw new Error("must provide 'user', 'client' and 'keyfile' arguments");
    }

    function create(token) {
      return client("client_tokens").insert({ user_id: user, client_id, token });
    }

    function generate([ match ]) {
      if(!match) {
        utils.log(utils.colors.red(`client ${client_id} not found`));
        return;
      }

      let payload = {
        "iss": match.client_id,
        "user": user
      };

      return jwt(payload, keyfile ).then(create);
    }

    function dedupe(results) {
      if(results.length !== 0) {
        utils.log(utils.colors.red(`token already exists b/w client[${client_id}] and user[${user}]`));
        return
      }

      return client("clients").where({ id: client_id }).then(generate);
    }

    return client("client_tokens").where({ user_id: user, client_id }).then(dedupe);
  },

  "client-tokens:search": function(client, argv) {
    let query = client("client_tokens")
      .leftJoin("clients", "clients.id", "client_tokens.client_id")
      .leftJoin("users", "users.id", "client_tokens.user_id")
      .select(
        "client_tokens.id as token_id",
        "users.email as 'user email'",
        "clients.name as 'client name'"
      );

    function print(results) {
      if(results.length === 0) {
        return utils.log("no tokens");
      }

      return table(results);
    }

    return query.then(print);
  }

};
