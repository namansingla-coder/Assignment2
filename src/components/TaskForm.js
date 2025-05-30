import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, task, onCancel }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Task title is required");

    // Check for past date manually (extra validation)
    if (dueDate && dueDate < today) {
      return alert("Due date cannot be in the past");
    }

    const newTask = {
      id: task ? task.id : Date.now(),
      title,
      dueDate,
      completed: task ? task.completed : false,
    };

    onSave(newTask);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm mb-6">
      <input
        type="text"
        placeholder="Task title"
        className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        min={today} // Prevent selecting past dates
      />
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
        >
          {task ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;