import { useState } from 'react';
import { editTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import moment from 'moment'
// import './EditTaskModal.css';

function EditTaskModal({user, task}) {
    const dispatch = useDispatch();

    const userId = user.id
    const tasktype = task.type
    const [title, setTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [difficulty, setDifficulty] = useState(task?.difficulty);
    const [startdate, setStartdate] = useState(moment(task?.start_date).format('YYYY-MM-DD') || '2024-01-01');
    const [repeatsevery, setRepeatsevery] = useState(task?.repeats_every || 1);
    const [duedate, setDuedate] = useState(moment(task?.due_date).format('YYYY-MM-DD') || '2024-01-01');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

  const handleDaily = async (e) => {
    setErrors({})
    e.preventDefault();
    const editedDaily = {
        id: task.id,
        user_id: userId,
        type: tasktype,
        title,
        description,
        difficulty,
        start_date: startdate,
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
        .then(closeModal())
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
        due_date: duedate
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
          <form onSubmit={handleDaily}>
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
                placeholder={startdate || 'YYYY-MM-DD'}
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
                        placeholder={duedate || 'YYYY-MM-DD'}
                        type="text"
                        value={duedate}
                        onChange={(e) => setDuedate(e.target.value)}
                        required
                        />
                    </label>
                    {errors.duedate && <p>{errors.duedate}</p>}
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}

export default EditTaskModal;
