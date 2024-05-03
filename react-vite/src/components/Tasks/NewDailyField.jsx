import { useState } from 'react';
import { postNewTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';

function NewDailyField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleNewTask = async (e) => {
    e.preventDefault();
    const newTask = { title, type: 'daily' };

    if (title) {
      return dispatch(postNewTask(newTask)).then(setTitle(''));
    }
  };
  return (
    <form onSubmit={handleNewTask}>
      <label>
        <input
          className="create-daily-input"
          placeholder={'Add a Daily'}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      {/* <button> Create Task</button> */}
    </form>
  );
}

export default NewDailyField;
