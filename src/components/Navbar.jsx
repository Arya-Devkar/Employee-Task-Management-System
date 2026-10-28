function Navbar({ role, onRoleChange }) {
    return (
        <nav className="navbar">
            <h2>TaskFlow</h2>

            <select
                value={role}
                onChange={(event) => onRoleChange(event.target.value)}
            >
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
            </select>
        </nav>
    );
}

export default Navbar;