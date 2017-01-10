
exports.up = function(knex, Promise) {
  return knex.table("clients")
    .where({id: 1})
    .update({
      uuid          : "827211f8-30a4-4ecb-8210-1c73a96396ea",
      client_id     : process.env["DEFAULT_CLIENT_ID"]     || "2424a8f3adef42072cc6",
      client_secret : process.env["DEFAULT_CLIENT_SECRET"] || "3efe9f57c43bc68069b4ccfed36c815928e198d0"
    });
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
