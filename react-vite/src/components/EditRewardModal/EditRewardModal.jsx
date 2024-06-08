import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editReward, removeReward } from '../../redux/rewards';
import './EditRewardModal.css';

function EditRewardModal({ user, reward }) {
  const dispatch = useDispatch();
  const userId = user.id;
  const [title, setTitle] = useState(reward?.title);
  const [description, setDescription] = useState(reward?.description);
  const [cost, setCost] = useState(reward?.difficulty);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDelete = async () => {
    closeModal();
    dispatch(removeReward(reward.id));
  };

  const handleReward = async (e) => {
    setErrors({});
    e.preventDefault();
    const editedReward = {
      id: reward.id,
      user_id: userId,
      title,
      description,
      cost,
    };

    if (!cost || !Number.isInteger(cost) || cost < 1) {
      errors.cost = 'Cost must be a positve integer';
      setErrors(errors);
      setTitle(title);
    } else {
      return dispatch(editReward(editedReward)).then(closeModal());
    }
  };


  return (
    <>
      <div className="reward-border">
        <div className="edit-reward-container">
          <form onSubmit={handleReward}>
            <label>
              Title
              <input
                placeholder={title || 'Write Thy Reward Here'}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Description
              <input
                placeholder={
                  description || 'Explain Thy Reward in Detail, Sire'
                }
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Cost
              <input
                placeholder={cost || 'Cost in Gold Coins'}
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </label>
            {errors.cost && <p>{errors.cost}</p>}
            <div className="btns">
              <div>
                <button className="btn-save" type="submit">
                  Save
                </button>
              </div>
              <div>
                <button className="btn-delete" onClick={handleDelete}>
                  Delete Reward
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="btns">
  <div>
    <button
      className="btn-edit-avatar"
      onClick={() => {
        setFormDisplayed(true);
      }}
    >
      Edit Avatar
    </button>
  </div>
  <div>
    <button onClick={handleResetAvatar} className="btn-reset-avatar">
      Reset Avatar
    </button>
  </div>
</div>; */
}

export default EditRewardModal;
