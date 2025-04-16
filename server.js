const http = require('http');
const fs = require('fs');
const EventEmitter = require('events')
const url = require('url');

const PORT = 3000;
const todosFile = './todos.json';
const logFile = './logs.txt';

const logger = new EventEmitter();

logger.on('log', (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFile(logFile, `${timestamp} - ${message}\n`, (err) => {
    if (err) console.error('Failed to write log:', err);
  });
});

const readTodos = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(todosFile, 'utf8', (err, data) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(data));
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
};

const writeTodos = (todos) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(todosFile, JSON.stringify(todos, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  logger.emit('log', `${method} ${path}`);

  if (path.startsWith('/todos')) {
    const parts = path.split('/').filter(Boolean); // [ 'todos', ':id?' ]
    const id = parts[1] ? parseInt(parts[1]) : null;

    try {
      let todos = await readTodos();

      // GET /todos or GET /todos?completed=true
      if (method === 'GET' && parts.length === 1) {
        let result = todos;

        if (parsedUrl.query.completed) {
          const filter = parsedUrl.query.completed === 'true';
          result = todos.filter(t => t.completed === filter);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        return;
      }

      // GET /todos/:id
      if (method === 'GET' && parts.length === 2) {
        const todo = todos.find(t => t.id === id);
        if (!todo) {
          res.writeHead(404);
          res.end('Todo not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todo));
        return;
      }

      // POST /todos
      if (method === 'POST' && parts.length === 1) {
        const data = await getRequestBody(req);
        if (!data.title) {
          res.writeHead(400);
          res.end('Missing title');
          return;
        }
        const newTodo = {
          id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
          title: data.title,
          completed: data.completed ?? false,
        };
        todos.push(newTodo);
        await writeTodos(todos);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTodo));
        return;
      }

      // PUT /todos/:id
      if (method === 'PUT' && parts.length === 2) {
        const data = await getRequestBody(req);
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) {
          res.writeHead(404);
          res.end('Todo not found');
          return;
        }
        todos[index] = {
          ...todos[index],
          ...data,
          id, // Ensure ID doesn't get overwritten
        };
        await writeTodos(todos);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos[index]));
        return;
      }

      // DELETE /todos/:id
      if (method === 'DELETE' && parts.length === 2) {
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) {
          res.writeHead(404);
          res.end('Todo not found');
          return;
        }
        todos.splice(index, 1);
        await writeTodos(todos);
        res.writeHead(200);
        res.end('Deleted');
        return;
      }

      // If route not matched
      res.writeHead(404);
      res.end('Not Found');
    } catch (err) {
      console.error('Error:', err);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
