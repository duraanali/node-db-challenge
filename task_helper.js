const db = require("./data/db-config");
module.exports = {
    list
};


function list() {
    return db("tasks")
        .join("projects", "tasks.project_id", "projects.id")
        .select(
            "tasks.id",
            "tasks.project_id",
            "tasks.description",
            "tasks.completed ",
            "projects.name as project_name",
            "projects.description as project_description"
        )
        .then(tasks => {
            return tasks.map(task => {
                task.completed = task.completed ? true : false;
                return task;
            });
        });
}