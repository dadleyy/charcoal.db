const crypto   = require("crypto");
const bluebird = require("bluebird");

module.exports = function randomString(desired_character_length) {
  // two hex characters per byte
  var byte_count = desired_character_length * 0.5;

  return new bluebird(function(resolve, reject) {
    crypto.randomBytes(byte_count, function(err, result) {
      resolve(result.toString("hex"));
    });
  });
};
