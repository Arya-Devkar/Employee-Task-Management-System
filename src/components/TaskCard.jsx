function TaskCard({ task, onStatusChange, onDelete }) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>Assigned to: {task.assignedTo}</p>
            <p>Priority: {task.priority}</p>

            <select
                value={task.status}
                onChange={(event) =>
                    onStatusChange(task.id, event.target.value)
                }
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            {onDelete && (
                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            )}
        </div>
    );
}

export default TaskCard;