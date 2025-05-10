const express = require('express');
const fs = require('fs').promises; // Use promises for file operations
const { EventEmitter } = require('events');

const app = express();
const PORT = 3000; // Define your port here
const todosFile = './todos.json';
const logFile = './logs.txt';

const logger = new EventEmitter();

logger.on('log', (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFile(logFile, `${timestamp} - ${message}\n`)
    .catch(err => console.error('Failed to write log:', err));
});

// Middleware to parse JSON bodies
app.use(express.json());

// Read todos from the file
const readTodos = async () => {
  try {
    const data = await fs.readFile(todosFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

// Write todos to the file
const writeTodos = async (todos) => {
  try {
    await fs.writeFile(todosFile, JSON.stringify(todos, null, 2));
  } catch (err) {
    throw err;
  }
};

// Log requests
app.use((req, res, next) => {
  logger.emit('log', `${req.method} ${req.path}`);
  next();
});

// GET /todos or GET /todos?completed=true
app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    let result = todos;

    if (req.query.completed) {
      const filter = req.query.completed === 'true';
      result = todos.filter(t => t.completed === filter);
    }

    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET /todos/:id
app.get('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todos = await readTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.json(todo);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// POST /todos
app.post('/todos', async (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).send('Missing title');
  }

  try {
    const todos = await readTodos();
    const newTodo = {
      id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      completed: completed ?? false,
    };
    todos.push(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// PUT /todos/:id
app.put('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  try {
    const todos = await readTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).send('Todo not found');
    }
    todos[index] = {
      ...todos[index],
      ...data,
      id, // Ensure ID doesn't get overwritten
    };
    await writeTodos(todos);
    res.json(todos[index]);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE /todos/:id
app.delete('/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todos = await readTodos();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).send('Todo not found');
    }
    todos.splice(index, 1);
    await writeTodos(todos);
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
``