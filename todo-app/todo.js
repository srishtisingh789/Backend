const fs = require("fs");
const path = require("path");

const TODO_FILE = path.join(__dirname, "todos.json");

// 📥 Read Todos
function readTodos() {
  const data = fs.readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

// 💾 Write Todos
function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}

// ➕ Add Todo
function addTodo(task) {
  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task: task,
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log("✅ Todo added:", task);
}

// 📋 List Todos
function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log("📭 No todos found!");
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.done ? "✅" : "❌";
    console.log(`${index + 1}. ${status} ${todo.task} (ID: ${todo.id})`);
  });
}

// ✔️ Mark Done
function markDone(id) {
  const todos = readTodos();

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log("❌ Todo not found");
    return;
  }

  todo.done = true;
  writeTodos(todos);

  console.log("🎉 Todo marked as done!");
}

// 🗑️ Delete Todo
function deleteTodo(id) {
  const todos = readTodos();
  const filteredTodos = todos.filter(t => t.id !== id);

  if (todos.length === filteredTodos.length) {
    console.log("❌ Todo not found");
    return;
  }

  writeTodos(filteredTodos);
  console.log("🗑️ Todo deleted!");
}

// 🚀 Test Run (you can modify this)
addTodo("Learn Node.js fs");
addTodo("Build Backend Project");
listTodos();

// 👉 Copy ID from list output
// Example:
// markDone(1700000000000);
// deleteTodo(1700000000000);

// 📦 Export (optional)
module.exports = {
  addTodo,
  listTodos,
  markDone,
  deleteTodo
};