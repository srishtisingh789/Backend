# 📝 Todo App (File System Based)

This is a simple Todo application built using Node.js and the fs (File System) module.

It stores data in a JSON file instead of a database.

---

## 🚀 Features

- ➕ Add Todo
- 📋 List Todos
- ✔️ Mark Todo as Done
- 🗑️ Delete Todo
- 💾 Persistent storage using file system

---

## 📁 Project Structure

todo-app/
│
├── todo.js
├── todos.json
├── README.md

---

## ⚙️ How It Works

1. Reads data from `todos.json`
2. Converts JSON → JavaScript object
3. Modifies the data
4. Saves it back to file

---

## ▶️ Run the Project

```bash
node todo.js