const utils = require("gulp-util");
const knex  = require("knex");
const blue  = require("bluebird");

module.exports = function(config, argv, handler) {
  return function exec() { 
    let client = knex(config.db);
    let destroy = client.destroy.bind(client);

    let p = blue.resolve(true);

    try {
      p = handler(client, argv);
    } catch(e) {
      utils.log(utils.colors.red(e));
      return destroy();
    }

    return blue.promisify(p).finally(destroy);
  };
};
