
exports.seed = function (knex) {

  return knex('projects_resources').insert([
    { project_id: 1, resource_id: 1 },
  ]);
};
