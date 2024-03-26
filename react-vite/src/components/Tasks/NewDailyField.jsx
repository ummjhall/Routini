import { useState } from 'react';
import { postNewTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';

function NewDailyField() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');

    const handleNewTask = async (e) => {
        e.preventDefault();
        const newTask = { title, 'type': 'daily' }
        if (title) {
            return dispatch(postNewTask(newTask))
        }
    }
    return (
        <form onSubmit={handleNewTask}>
            <label>
            <input
            placeholder={"Create new Daily Task"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            </label>
            <button > Create Task</button>
        </form>
    )
}

export default NewDailyField
