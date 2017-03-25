const utils = require("gulp-util");
const table = require("easy-table");

module.exports = function(data) {
  let t = new table();

  for(let i = 0, c = data.length; i < c; i++) {
    let item = data[i];
    let keys = Object.keys(item);

    for(let j = 0, x = keys.length; j < x; j++) {
      let k = keys[j];
      let v = item[k];
      t.cell(k, v);
    }

    t.newRow()
  }

  utils.log(`\n${t.toString()}`);
};
