// import { useState } from 'react';
import { removeTask } from '../../redux/tasks';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
// import moment from 'moment'
// import { redirect } from 'react-router-dom';
import './EditTaskModal.css';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function DeleteTaskModal({ task }) {
  const dispatch = useDispatch();
  // const userId = user.id
  // const tasktype = task.type
  // const [title, setTitle] = useState(task?.title);
  // const [description, setDescription] = useState(task?.description);
  // const [difficulty, setDifficulty] = useState(task?.difficulty);
  // const [startdate, setStartdate] = useState(task?.start_date || new Date());
  // const [repeatsevery, setRepeatsevery] = useState(task?.repeats_every || 1);
  // const [duedate, setDuedate] = useState(task?.due_date || new Date());
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDelete = async () => {
    dispatch(removeTask(task.id)).then(closeModal);
  };

  return (
    <>
      <div className="delete-task-border">
        <div className="delete-task-container">
          <h1 id="delTaskH1">Confirm Delete?</h1>
          <p id="delTask?">Are you sure you want to remove this review?</p>
          <div className="btns">
            <div id="YDeleteTaskDiv">
              <button
                id="YDeleteRvwBtn"
                className="btn-delete"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
            <div id="NDeleteTaskDiv">
              <button
                id="NDeleteTaskBtn"
                className="btn-save"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteTaskModal;
