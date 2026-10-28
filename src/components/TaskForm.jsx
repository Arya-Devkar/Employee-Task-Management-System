    import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("Arya");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      assignedTo,
      priority,
    });

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Create a task</h2>

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task title"
      />

      <select
        value={assignedTo}
        onChange={(event) => setAssignedTo(event.target.value)}
      >
        <option value="Arya">Arya</option>
        <option value="Rahul">Rahul</option>
      </select>

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;