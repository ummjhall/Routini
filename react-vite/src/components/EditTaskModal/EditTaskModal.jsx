import { useState } from 'react';
import { updateTask } from '../../redux/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

// import './EditTaskModal.css';

function EditTaskModal({user, task}) {
    const dispatch = useDispatch();
    console.log(task)
    const userId = user.id
    const tasktype = task.type
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [difficulty, setDifficulty] = useState(task?.difficulty);
    const [startdate, setStartdate] = useState(task?.start_date);
    const [repeatsevery, setRepeatsevery] = useState(task?.repeats_every);
    const [duedate, setDuedate] = useState(task?.due_date);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.values(errors).length === 0) {
        return dispatch(
            updateTask({
              user_id: userId,
              type: tasktype,
              title,
              description,
              difficulty,
              start_date: startdate,
              repeats_every: repeatsevery,
              due_date: duedate
            })
        );

    // }
    // if (serverResponse) {
    //   setErrors(serverResponse);
    // } else {
    //   closeModal();
    // }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            placeholder={title || 'title'}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}
        <label>
          Description
          <input
            type="text"
            value={description || 'description'}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default EditTaskModal;
