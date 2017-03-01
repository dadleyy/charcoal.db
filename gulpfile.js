const gulp     = require("gulp");
const argv     = require("yargs").argv;

const db_config = require("./knexfile");

require("./tasks/clients")(gulp, db_config, argv);
require("./tasks/users")(gulp, db_config, argv);
