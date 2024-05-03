import { useState } from 'react';
import { postNewTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';

function NewHabitField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({})

  const handleNewTask = async (e) => {
    e.preventDefault();
    setErrors({})
    const newTask = { title, type: 'to-do' };
    if (title.trim().length === 0) {
      errors.title = 'Title must have text';
      setErrors(errors)
      setTitle('')
    }
    else {
      return dispatch(postNewTask(newTask)).then(setTitle(''));
    }
  };
  return (
    <form onSubmit={handleNewTask}>
      <label>
        <input
            className="create-habit-input"
          placeholder={'Add a Habit'}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      {errors.title && <p className='error'>{errors.title}</p>}
      {/* <button> Create Task</button> */}
    </form>
  );
}

export default NewHabitField;
