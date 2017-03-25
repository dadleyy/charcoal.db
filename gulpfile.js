const utils = require("gulp-util");
const gulp  = require("gulp");
const argv  = require("yargs").argv;
const glob  = require("glob");
const wrap  = require("./cli/helpers/wrapper");

const { development: db } = require("./knexfile");
const config = { db };

const groups = glob.sync("./cli/tasks/**/*.js");
const tasks = [ ];

function noop() { }

function help() {
  utils.log('available tasks:');

  for(let i = 0, c = tasks.length; i < c; i++) {
    utils.log(`  ${tasks[i].name}`);
  }
}

for(let i = 0, c = groups.length; i < c; i++) {
  let qualifed = require.resolve(groups[i]);
  let contents = require(qualifed);

  for(let task_name in contents) {
    let handler = contents[task_name];

    if(typeof handler !== "function") {
      continue;
    }

    tasks.push({ name: task_name });
    gulp.task(task_name, wrap(config, argv, handler));
  }
}

function green(s) {
  return utils.colors.green(s);
}

function env() {
  let { connection } = db;
  utils.log(`env: hostname[${green(connection.host)}] db[${green(connection.database)}]`);
}

gulp.task("env", env);
gulp.task("default", help);
