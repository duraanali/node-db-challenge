
exports.seed = function (knex) {

  return knex('resources').insert([
    {
      resource_name: 'This is a resource name',
      description: 'This is a resource description'
    }
  ]);
};
