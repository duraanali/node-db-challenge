
exports.seed = function (knex) {

  return knex('tasks').insert([
    {
      project_id: 1,
      task_description: 'Fork and Clone Repository',
      notes: 'this is a note',
      completed: true
    },
    {
      project_id: 1,
      task_description: 'Install Dependencies',
      notes: 'Remember to cd into the folder where the Project was cloned',
      completed: false
    }
  ]);
};
