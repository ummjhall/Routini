import { useState } from 'react';
import { editTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import moment from 'moment'
// import { redirect } from 'react-router-dom';
import './EditTaskModal.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteTaskModal from './DeleteTaskModal';

function EditTaskModal({ user, task }) {
  const dispatch = useDispatch();

  const userId = user.id;
  const tasktype = task.type;
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [difficulty, setDifficulty] = useState(task?.difficulty);
  const [startdate, setStartdate] = useState(task?.start_date || new Date());
  const [repeatsevery, setRepeatsevery] = useState(task?.repeats_every || 1);
  const [duedate, setDuedate] = useState(task?.due_date || new Date());
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDaily = async (e) => {
    setErrors({});

    e.preventDefault();
    const editedDaily = {
      id: task.id,
      user_id: userId,
      type: tasktype,
      title,
      description,
      difficulty,
      start_date: new Date(startdate).getTime() / 1000,
      repeats_every: repeatsevery,
    };

    let errHits = {};

    if (!title) {
      errHits.title = 'Title is required.';
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
      errHits.difficulty = 'Difficulty must be an integer';
    }
    if (!startdate) {
      errHits.startdate = 'Start date is required.';
    }
    if (!repeatsevery || !Number.isInteger(parseInt(repeatsevery))) {
      errHits.repeatsevery = 'Repeats must be an integer';
    }

    setErrors(errHits);

    if (!Object.values(errors).length) {
      dispatch(editTask(editedDaily));
    } else {
      return setErrors(errHits);
    }

    closeModal();
  };

  const handleHabit = async (e) => {
    setErrors({});

    e.preventDefault();

    const editedDaily = {
      id: task.id,
      user_id: userId,
      type: tasktype,
      title,
      description,
      difficulty,
    };

    let errHits = {};

    if (!title) {
      errHits.title = 'Title is required.';
    }
    if (!description) {
      errHits.description = 'Description is required.';
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
      errHits.difficulty = 'Difficulty must be an integer';
    }

    setErrors(errHits);

    if (!Object.values(errors).length) {
      dispatch(editTask(editedDaily)).then(closeModal());
    } else {
      return setErrors(errHits);
    }
  };

  const handleToDo = async (e) => {
    setErrors({});
    e.preventDefault();
    const editedDaily = {
      id: task.id,
      type: tasktype,
      user_id: userId,
      title,
      description,
      difficulty,
      due_date: new Date(duedate).getTime() / 1000,
    };
    let errHits = {};
    if (!title) {
      errHits.title = 'Title is required.';
    }
    if (!description) {
      errHits.description = 'Description is required.';
    }
    if (!difficulty || !Number.isInteger(difficulty)) {
      errHits.difficulty = 'Difficulty must be an integer';
    }
    if (!duedate) {
      errHits.duedate = 'Due date is required.';
    }
    setErrors(errHits);

    if (!Object.values(errors).length) {
      dispatch(editTask(editedDaily)).then(setErrors({})).then(closeModal());
    } else {
      return setErrors(errHits);
    }
  };

  if (task.type === 'daily') {
    return (
      <>
        <div className="task-border">
          <div className="edit-task-container">
            <form onSubmit={handleDaily} className="taskForm">
              <label>
                Title
                <input
                  placeholder={title || 'Write Thy Daily Here'}
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
                  placeholder={description || 'Explain Thy Daily in Detail'}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              {errors.description && <p>{errors.description}</p>}
              <label>
                Difficulty
                <input
                  placeholder={
                    difficulty || 'From 1 to 4, how difficult is this Daily?'
                  }
                  type="number"
                  value={difficulty}
                  min={0}
                  max={4}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value < 1) {
                      value = 1;
                    } else if (value > 4) {
                      value = 4;
                    }
                    setDifficulty(value);
                  }}
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
                  type="number"
                  value={repeatsevery}
                  onChange={(e) => setRepeatsevery(e.target.value)}
                  max={4}
                />
              </label>
              {errors.repeatsevery && <p>{errors.repeatsevery}</p>}
              <div className="btns">
                <div>
                  <button className="btn-save" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <OpenModalMenuItem
                    task={task}
                    itemText={`Delete Task`}
                    modalComponent={<DeleteTaskModal user={user} task={task} />}
                    customClass={'btn-delete'}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  if (task.type === 'habit') {
    return (
      <>
        <div className="task-border">
          <div className="edit-task-container">
            <form onSubmit={handleHabit}>
              <label>
                Title
                <input
                  placeholder={title || 'Write Thy Habit Here'}
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
                  placeholder={description || 'Explain Thy Habit in Detail'}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              {errors.description && <p>{errors.description}</p>}
              <label>
                Difficulty
                <input
                  placeholder={
                    difficulty || 'From 1 to 4, how difficult is this Habit?'
                  }
                  type="number"
                  value={difficulty}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value < 1) {
                      value = 1;
                    } else if (value > 4) {
                      value = 4;
                    }
                    setDifficulty(value);
                  }}
                />
              </label>
              {errors.difficulty && <p>{errors.difficulty}</p>}
              <div className="btns">
                <div>
                  <button className="btn-save" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <OpenModalMenuItem
                    task={task}
                    itemText={`Delete Task`}
                    modalComponent={<DeleteTaskModal user={user} task={task} />}
                    customClass={'btn-delete'}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  if (task.type === 'to-do') {
    return (
      <>
        <div className="task-border">
          <div className="edit-task-container">
            <form onSubmit={handleToDo}>
              <label>
                Title
                <input
                  placeholder={title || 'Write Thy To Do Here'}
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
                  placeholder={description || 'Explain Thy To Do in Detail'}
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              {errors.description && <p>{errors.description}</p>}
              <label>
                Difficulty
                <input
                  placeholder={
                    difficulty || 'From 1 to 4, how difficult is this To Do?'
                  }
                  type="number"
                  value={difficulty}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value < 1) {
                      value = 1;
                    } else if (value > 4) {
                      value = 4;
                    }
                    setDifficulty(value);
                  }}
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
                />
              </label>
              {errors.duedate && <p>{errors.duedate}</p>}
              <div className="btns">
                <div>
                  <button className="btn-save" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <OpenModalMenuItem
                    task={task}
                    itemText={`Delete Task`}
                    modalComponent={<DeleteTaskModal user={user} task={task} />}
                    customClass={'btn-delete'}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default EditTaskModal;
