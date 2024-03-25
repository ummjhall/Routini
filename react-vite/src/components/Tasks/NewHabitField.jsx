import { useState } from 'react';
import { postNewTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';

function NewHabitField() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');

    const handleNewTask = async (e) => {
        e.preventDefault();

        const newTask = { title, type: 'habit' }
        if (title) {
            return dispatch(postNewTask(newTask))
        }
    }
    return (
        <form onSubmit={handleNewTask}>
            <label>
            <input
            placeholder={"Create new Habit"}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
            </label>
            <button> Create Task</button>
        </form>
    )
}

export default NewHabitField
