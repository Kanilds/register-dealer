exports.up = function(knex) {
  return knex.schema.createTable('carros', function (table) {
    table.increments()
    
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()
    
    table.string('concessionaria_id').notNullable()
    
    table.foreign('concessionaria_id').references('id').inTable('concessionarias')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('carros')
};
