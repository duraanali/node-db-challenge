
exports.seed = function (knex) {
  return knex('projects').insert([
    {
      project_name: 'Fixing a website',
      description: 'this project is just an example',
    }
  ]);
};
