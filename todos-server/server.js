const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const FILE = path.join(__dirname, "todos.json");

// Helper: Read Todos
function readTodos() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  const data = fs.readFileSync(FILE, "utf-8");
  return JSON.parse(data);
}

// Helper: Write Todos
function writeTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

// Server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 🟢 GET /todos → list all
  if (method === "GET" && url === "/todos") {
    const todos = readTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  }

  // 🟢 POST /todos → add new
  else if (method === "POST" && url === "/todos") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { task } = JSON.parse(body);
      const todos = readTodos();

      const newTodo = {
        id: Date.now(),
        task,
        done: false
      };

      todos.push(newTodo);
      writeTodos(todos);

      res.writeHead(201);
      res.end(JSON.stringify(newTodo));
    });
  }

  // 🟢 PUT /todos?id=123 → mark done
  else if (method === "PUT" && url.startsWith("/todos")) {
    const id = parseInt(url.split("=")[1]);
    const todos = readTodos();

    const todo = todos.find(t => t.id === id);

    if (!todo) {
      res.writeHead(404);
      return res.end("Todo not found");
    }

    todo.done = true;
    writeTodos(todos);

    res.writeHead(200);
    res.end("Todo marked done");
  }

  // 🟢 DELETE /todos?id=123
  else if (method === "DELETE" && url.startsWith("/todos")) {
    const id = parseInt(url.split("=")[1]);
    const todos = readTodos();

    const filtered = todos.filter(t => t.id !== id);

    if (filtered.length === todos.length) {
      res.writeHead(404);
      return res.end("Todo not found");
    }

    writeTodos(filtered);

    res.writeHead(200);
    res.end("Todo deleted");
  }

  // ❌ Not Found
  else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});