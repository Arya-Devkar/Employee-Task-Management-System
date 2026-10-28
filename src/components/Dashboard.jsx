function Dashboard({ taskStats }) {
  return (
    <div className="dashboard-stats">
      <p>Total tasks: {taskStats.total}</p>
      <p>Pending tasks: {taskStats.pending}</p>
      <p>Completed tasks: {taskStats.completed}</p>
    </div>
  );
}

export default Dashboard;