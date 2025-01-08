const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // Habilita CORS para permitir que el frontend haga peticiones

app.use(express.json());

let tasks = require("./data/tasks.json")

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const newTask = { id: Date.now(), text: req.body.text };
    tasks.push(newTask);
    fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks));
    res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks));
    res.status(200).send('Task deleted');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});