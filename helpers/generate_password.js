const bluebird = require("bluebird");
const bcrypt   = require("bcrypt");

module.exports = function generate(plain) {
  return new bluebird(function(resolve, reject) {
    bcrypt.hash(plain, 10, function(err, result) {
      if(err) return reject(err);
      resolve(result);
    });
  });
};
