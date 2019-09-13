const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const db = require('./data/db-config.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(bodyParser.json());

server.get('/api/projects', (req, res) => {
    // get all projects from the database

    db('projects')

        .then(projects => {
            projects.map(project => {
                if (project.completed === 0) {
                    project.completed = false;
                } else {
                    project.completed = true;
                }
            });
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.get('/api/resources', (req, res) => {
    // get all resources from the database
    db('resources')
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

server.get('/api/tasks', (req, res) => {
    // get all tasks from the database
    db('tasks')
        .then(tasks => {
            tasks.map(task => {
                if (task.completed === 0) {
                    task.completed = false;
                } else {
                    task.completed = true;
                }
            });
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// create resources
server.post('/api/resources', (req, res) => {
    db('resources').insert(req.body)
        .then(ids => {
            const id = ids[0];

            db('resources')
                .where({ id })
                .first()
                .then(resource => {
                    res.status(201).json(resource);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// create projects
server.post('/api/projects', (req, res) => {
    db('projects').insert(req.body)
        .then(ids => {
            const id = ids[0];

            db('projects')
                .where({ id })
                .first()
                .then(project => {
                    res.status(201).json(project);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// create Tasks
server.post('/api/tasks', (req, res) => {
    db('tasks').insert(req.body)
        .then(ids => {
            const id = ids[0];

            db('tasks')
                .where({ id })
                .first()
                .then(task => {
                    res.status(201).json(task);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});



module.exports = server;
