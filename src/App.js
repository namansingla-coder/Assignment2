import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? task : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, task]);
    }
    setShowForm(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortTasks = (taskList) => {
    switch (sort) {
      case "name-asc":
        return taskList.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return taskList.sort((a, b) => b.title.localeCompare(a.title));
      case "date-asc":
        return taskList.sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
      case "date-desc":
        return taskList.sort((a, b) => (b.dueDate || "").localeCompare(a.dueDate || ""));
      default:
        return taskList;
    }
  };

  const filteredTasks = sortTasks(
    tasks
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      })
      .filter((task) =>
        (task.title || "").toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">My To-Do List</h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            className="border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none px-4 py-2 rounded-lg w-full sm:w-1/3"
            placeholder="Search tasks..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <select
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="none">Sort by</option>
              <option value="name-asc">Name ↑</option>
              <option value="name-desc">Name ↓</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
            </select>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
            >
              + Add Task
            </button>
          </div>
        </div>

        {showForm && (
          <TaskForm
            onSave={addTask}
            task={editingTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
};

export default App;