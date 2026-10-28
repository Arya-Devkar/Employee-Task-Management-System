
import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import useNotification from "./utils/useNotification";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Prepare monthly report",
    assignedTo: "Arya",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Test login page",
    assignedTo: "Rahul",
    priority: "Medium",
    status: "In Progress",
  },
];



function App() {

  const { notification, showNotification } = useNotification();
  const [role, setRole] = useState("Admin");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("employeeTasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return initialTasks;
      }
    }

    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("employeeTasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    const task = {
      ...newTask,
      id: Date.now(),
      status: "Pending",
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    showNotification("Task added successfully!");
  }

  function handleStatusChange(id, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
    showNotification("Task status updated!");
  }

  function handleDelete(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
    showNotification("Task deleted successfully!");
  }

  const visibleTasks =
    role === "Admin"
      ? tasks
      : tasks.filter((task) => task.assignedTo === "Arya");

  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter(
        (task) => task.status === "Pending"
      ).length,
      completed: tasks.filter(
        (task) => task.status === "Completed"
      ).length,
    };
  }, [tasks]);

  return (
    <div className="app">
      <Navbar role={role} onRoleChange={setRole} />

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <main className="dashboard">
        <h1>{role} Dashboard</h1>

        <Dashboard taskStats={taskStats} />

        {role === "Admin" && (
          <TaskForm onAddTask={handleAddTask} />
        )}

        <h2>
          {role === "Admin" ? "All Tasks" : "My Tasks"}
        </h2>

        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDelete={role === "Admin" ? handleDelete : undefined}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
