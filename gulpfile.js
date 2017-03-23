const utils = require("gulp-util");
const gulp  = require("gulp");
const argv  = require("yargs").argv;
const glob  = require("glob");
const wrap  = require("./cli/helpers/wrapper");

const { development: db } = require("./knexfile");
const config = { db };

const groups = glob.sync("./cli/tasks/**/*.js");

function noop() { }

function help() {
  utils.log('whoa');
}

for(let i = 0, c = groups.length; i < c; i++) {
  let qualifed = require.resolve(groups[i]);
  let contents = require(qualifed);

  for(let task_name in contents) {
    let handler = contents[task_name];
    gulp.task(task_name, wrap(config, argv, typeof handler === "function" ? handler : noop));
  }
}

gulp.task("default", help);
