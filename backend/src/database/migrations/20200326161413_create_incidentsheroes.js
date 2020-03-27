//npx knex migrate:make create_incidentsheroes
//npx knex migrate:latest
exports.up = function(knex) {
    return  knex.schema.createTable('incidentheroes',function(table){
           table.increments();
           table.decimal('isAnonymous').notNullable();
           table.string('nameHero');
           table.string('incident_id').notNullable();
           table.foreign('incident_id').references('id').inTable('incidents');
     })
   };
   
   exports.down = function(knex) {
      return knex.schema.dropTable('incidentheroes');
   };
   