
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (taskTitle.trim() === "") {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      status: "incomplete",
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
  };

  const markCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: "completed" } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTasks = () => {
    return tasks
      .filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
      })
      .map((task) => (
        <div
          key={task.id}
          className={`task ${task.status === "completed" ? "completed" : ""}`}
        >
          <div>
            <strong>{task.title}</strong>
            <br />
            <small>{task.description || "No description"}</small>
          </div>
          <div className="buttons">
            <button
              className="mark-completed-btn"
              onClick={() => markCompleted(task.id)}
            >
              Mark as Completed
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="container">
      <h1>Task Management Application</h1>

      {/* Form to add a new task */}
      <div className="form-container">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task to be added"
          required
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description (optional)"
        ></textarea>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter Buttons */}
      <h3>Filter Tasks</h3>
      <div className="filter-buttons">
        <button className="filter-btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="filter-btn" onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button className="filter-btn" onClick={() => setFilter("incomplete")}>
          Incomplete
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">{renderTasks()}</div>
    </div>
  );
}

export default App;

