import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, task, onCancel }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Task title is required";
    if (dueDate && dueDate < today) newErrors.dueDate = "Due date cannot be in the past";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const newTask = {
      id: task ? task.id : Date.now(),
      title,
      dueDate,
      completed: task ? task.completed : false,
    };

    onSave(newTask);
    setTitle("");
    setDueDate("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm mb-6"
    >
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
            errors.title ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="date"
          className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
            errors.dueDate ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
          }`}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
        />
        {errors.dueDate && (
          <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
        )}
      </div>

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