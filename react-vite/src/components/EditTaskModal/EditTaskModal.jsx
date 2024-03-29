import { useState } from 'react';
import { editTask, removeTask, getTasks } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import moment from 'moment'
import { redirect } from 'react-router-dom';
import './EditTaskModal.css';

function EditTaskModal({user, task}) {
    const dispatch = useDispatch();

    const userId = user.id
    const tasktype = task.type
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [difficulty, setDifficulty] = useState(task?.difficulty);
    const [startdate, setStartdate] = useState(task?.start_date || new Date());
    const [repeatsevery, setRepeatsevery] = useState(task?.repeats_every || 1);
    const [duedate, setDuedate] = useState(task?.due_date || new Date());
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        closeModal()
        dispatch(removeTask(task.id))
        // .then(redirect('/'))
        // .then(closeModal())
    }

  const handleDaily = async (e) => {
    setErrors({})
    console.log(task.start_date)
    e.preventDefault();
    const editedDaily = {
        id: task.id,
        user_id: userId,
        type: tasktype,
        title,
        description,
        difficulty,
        start_date: new Date(startdate).getTime()/1000,
        repeats_every: repeatsevery
    };
    let errHits = {}
    if (!title) {
        errHits.title = "Title is required.";
    }
    if (!description) {
        errHits.description = "Description is required.";
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
        errHits.difficulty = "Difficulty must be an integer";
    }
    if (!startdate) {
        errHits.startdate = "Start date is required.";
    }
    if (!repeatsevery || !Number.isInteger(parseInt(repeatsevery))) {
        errHits.repeatsevery = "Repeats must be an integer";
    }
    setErrors(errHits);
    console.log(errors)
    if (!Object.values(errors).length) {
        dispatch(editTask(editedDaily))
        // .then(closeModal())
    }
    else {
        return (setErrors(errHits))
    }
  };

  const handleHabit = async (e) => {
    setErrors({})
    e.preventDefault();
    const editedDaily = {
        id: task.id,
        user_id: userId,
        type: tasktype,
        title,
        description,
        difficulty
    };
    let errHits = {}
    if (!title) {
        errHits.title = "Title is required.";
    }
    if (!description) {
        errHits.description = "Description is required.";
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
        errHits.difficulty = "Difficulty must be an integer";
    }
    setErrors(errHits);
    console.log(errors)
    if (!Object.values(errors).length) {
        dispatch(
            editTask(editedDaily)
        )
        .then(closeModal())
    }
    else {
        return (setErrors(errHits))
    }
  };

  const handleToDo = async (e) => {
    setErrors({})
    e.preventDefault();
    const editedDaily = {
        id: task.id,
        type: tasktype,
        user_id: userId,
        title,
        description,
        difficulty,
        due_date: new Date(duedate).getTime()/1000
    };
    let errHits = {}
    if (!title) {
        errHits.title = "Title is required.";
    }
    if (!description) {
        errHits.description = "Description is required.";
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
        errHits.difficulty = "Difficulty must be an integer";
    }
    if (!duedate) {
        errHits.duedate = "Due date is required.";
    }
    setErrors(errHits);
    console.log(errors)
    if (!Object.values(errors).length) {
        dispatch(
            editTask(editedDaily)
        )
        .then(setErrors({}))
        .then(closeModal())
    }
    else {
        return (setErrors(errHits))
    }
  };

  if (task.type === 'daily') {

    return (
        <>
          <form onSubmit={handleDaily} className='taskForm'>
            <label>
              Title
              <input
                placeholder={title || 'title'}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            {errors.title && <p>{errors.title}</p>}
            <label>
              Description
              <input
                placeholder={description || 'description'}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            {errors.description && <p>{errors.description}</p>}
            <label>
              Difficulty
              <input
                placeholder={difficulty || 'difficulty'}
                type="text"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </label>
            {errors.difficulty && <p>{errors.difficulty}</p>}
            <label>
              Start Date
              <input
                placeholder={'20 Mar 2024 00:00:00 GMT'}
                type="text"
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
              />
            </label>
            {errors.startDate && <p>{errors.startDate}</p>}
            <label>
              Repeats
              <input
                placeholder={repeatsevery || 'repeats every'}
                type="text"
                value={repeatsevery}
                onChange={(e) => setRepeatsevery(e.target.value)}
              />
            </label>
            {errors.repeatsevery && <p>{errors.repeatsevery}</p>}
            <button type="submit">Save</button>
          </form>
          <button onClick={handleDelete}>Delete This Task</button>
        </>
    );
    }
    if (task.type === 'habit') {
        return (
            <>
                <form onSubmit={handleHabit}>
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
                        placeholder={description || 'description'}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                    <label>
                        Difficulty
                        <input
                        placeholder={difficulty || 'difficulty'}
                        type="text"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                        />
                    </label>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                    <button type="submit">Save</button>
                </form>
                <button onClick={handleDelete}>Delete This Task</button>
            </>
        );
    }
    if (task.type === 'to-do') {
        return (
            <>
                <form onSubmit={handleToDo}>
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
                        placeholder={description || 'description'}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </label>
                    {errors.description && <p>{errors.description}</p>}
                    <label>
                        Difficulty
                        <input
                        placeholder={difficulty || 'difficulty'}
                        type="text"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                        />
                    </label>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                    <label>
                        Due Date
                        <input
                        placeholder={'20 Mar 2024 00:00:00 GMT'}
                        type="text"
                        value={duedate}
                        onChange={(e) => setDuedate(e.target.value)}
                        required
                        />
                    </label>
                    {errors.duedate && <p>{errors.duedate}</p>}
                    <button type="submit">Save</button>
                </form>
                <button onClick={handleDelete}>Delete This Task</button>
            </>
        );
    }
}

export default EditTaskModal;
