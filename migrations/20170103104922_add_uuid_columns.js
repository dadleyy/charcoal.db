const targets = [
  "activity",
  "client_admins",
  "client_tokens",
  "clients",
  "display_schedules",
  "files",
  "google_accounts",
  "photos",
  "system_email_domains",
  "system_settings",
  "user_role_mappings",
  "user_roles",
  "users",
  "instagram_photos"
];

exports.up = function(knex, Promise) {
  function index(table_name) {
    return knex.schema.table(table_name, function(table) { table.index("uuid"); });
  }

  function add(table_name) {
    return knex.schema.table(table_name, function(table) { return table.string("uuid", 64); });
  }

  function exec(table_name) {
    return add(table_name).then(function() { return index(table_name); });
  }

  return Promise.map(targets, exec);
};

exports.down = function(knex, Promise) {
  function index(table_name) {
    return knex.schema.table(table_name, function(table) { table.dropIndex("uuid"); });
  }

  function drop(table_name) {
    return knex.schema.table(table_name, function(table) { return table.dropColumn("uuid"); });
  }

  function exec(table_name) {
    return index(table_name).then(function() { return drop(table_name); });
  }

  return Promise.map(targets, exec);
};
