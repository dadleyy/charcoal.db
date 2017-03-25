const fs       = require("fs");
const bluebird = require("bluebird");
const jwt      = require("jsonwebtoken");

module.exports = function(payload, keyfile) {
  let read = bluebird.promisify(fs.readFile);
  let sign = bluebird.promisify(jwt.sign);

  function generate(buffer) {
    return sign(payload, buffer, {algorithm: "RS512"});
  }

  return read(keyfile).then(generate);
}
