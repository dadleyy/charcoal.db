var alter = "ALTER TABLE `game_memberships` MODIFY COLUMN `status` ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE'";

exports.up = function(knex, Promise) {
  var query = knex("game_memberships")
    .where("status", null)
    .update("status", "ACTIVE")

  function migrate() {
    return knex.schema.raw(alter);
  }

  return query.then(migrate);
};

exports.down = function(knex, Promise) {
  
};
