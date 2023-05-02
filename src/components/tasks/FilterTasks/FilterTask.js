export default function FilterProduct() {
    return (<div className="filter-area">
        <select name="viewTasks">
            <option value="all">All Tasks</option>
            <option value="incomplete">In Progress</option>
            <option value="complete">Completed</option>
        </select>
    </div>)
}