import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = !task.completed && task.dueDate && task.dueDate < today;

  return (
    <li className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mt-1 accent-indigo-600"
        />
        <div>
          <p
            className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {task.title}
          </p>
          <p className="text-sm text-gray-500">
            Due: {task.dueDate || "N/A"}
            {isOverdue && (
              <span className="text-red-600 font-semibold ml-2">⚠️ Overdue</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <button className="text-indigo-600 hover:underline text-2xl" onClick={onEdit}>
          <CiEdit />
        </button>
        <button className="text-red-600 hover:underline text-2xl" onClick={onDelete}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;