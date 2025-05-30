import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  if (tasks.length === 0)
    return <p className="text-center text-gray-500">No tasks available.</p>;

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id)}
          onEdit={() => onEdit(task)}
        />
      ))}
    </ul>
  );
};

export default TaskList;