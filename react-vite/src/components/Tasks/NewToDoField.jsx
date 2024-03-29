import { useState } from 'react';
import { postNewTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';

function NewToDoField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const handleNewTask = async (e) => {
    e.preventDefault();
    const newTask = { title, type: 'to-do' };
    if (title) {
      return dispatch(postNewTask(newTask)).then(setTitle(''));
    }
  };
  return (
    <form onSubmit={handleNewTask}>
      <label>
        <input
          className="create-todo-input"
          placeholder={'Add a To Do'}
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

export default NewToDoField;
