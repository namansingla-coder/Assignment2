# React To-Do List App

A feature-rich and responsive To-Do List application built with **React** and **Tailwind CSS** that allows users to:

- Add, remove, and mark tasks as complete
- Set due dates (with validation for past dates)
- Search, filter (All / Completed / Pending), and sort tasks by name or due date
- ⚠Show warnings for overdue pending tasks
- Persist data using `localStorage`

---

## Features

- **Add / Edit Tasks** with title and due date (past dates not allowed)
- **Mark as Complete / Pending**
- **Delete Tasks**
- **Search** tasks by title
- **Filter** tasks by status: All, Completed, Pending
- **Sort** tasks:
  - Alphabetically (A-Z / Z-A)
  - By Due Date (Oldest First / Newest First)
- **Overdue Warning** if the due date has passed and task is pending
- **Responsive UI** using **Tailwind CSS**
- **Persistent State** using `localStorage`

---

## 🛠Installation

```bash
git clone https://github.com/namansingla-coder/Assignment2.git
cd Assignment2
npm install
npm start
```

Open in browser: http://localhost:3000

⸻

## Testing Guide

This app is manually testable via the browser.

    1. Add Task
    	• Click + Add Task, enter a title and due date, click Add
    	• Submitting without title shows alert
    	• Choosing past date shows alert
    2. Edit Task
    	• Click ✏️ icon → modify task and save
    3. Complete / Incomplete
    	• Toggle checkbox → task gets marked completed/incomplete
    4. Delete Task
    	• Click 🗑️ icon to delete
    5. Search
    	• Search bar filters tasks by title
    6. Filter
    	• Use dropdown to view All / Completed / Pending tasks
    7. Sort
    	• Use sorting dropdown to sort by name or due date
    8. Overdue Warning
    	• Tasks with due date older than today and not completed show warning
    9. Persistence
    	• Refreshing the page keeps task data via localStorage

⸻

## Folder Structure
```bash
src/
│
├── components/
│   ├── TaskForm.js
│   ├── TaskItem.js
│   └── TaskList.js
│
├── App.js
├── index.js
└── index.css
```
---
## Technologies Used
	React
	Tailwind CSS
	React Icons
	HTML5, CSS3, JavaScript (ES6)
---
## Author
	Naman Singla - (https://www.linkedin.com/in/namansingla7642/)

