
exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('project_name', 255).notNullable();
            tbl.string('description');
            tbl.boolean('completed').defaultTo(false).notNullable();
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('resource_name', 255).notNullable();
            tbl.string('description');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('task_description', 255).notNullable();
            tbl.string('notes', 255);
            tbl.boolean('completed').defaultTo(false).notNullable();
            // Foreign Key
            tbl
                .integer('project_id')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates
        })
        .createTable('projects_resources', tbl => {
            tbl
                .integer('project_id')
                .unsigned()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates
            tbl
                .integer('resource_id')
                .unsigned()
                .references('id')
                .inTable('resources')
                .onDelete('CASCADE') // if the PK record is deleted
                .onUpdate('CASCADE'); // if the PK value updates

            tbl.primary(['project_id', 'resource_id']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
