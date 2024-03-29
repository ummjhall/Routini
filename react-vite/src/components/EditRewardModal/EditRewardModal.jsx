import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editReward, removeReward } from '../../redux/rewards';

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
    let errHits = {};

    if (!cost || !Number.isInteger(cost)) {
      errHits.cost = 'Cost must be an integer';
    }
    setErrors(errHits);
    if (!Object.values(errors).length) {
      dispatch(editReward(editedReward)).then(closeModal());
    } else {
      return setErrors(errHits);
    }
  };

  return (
    <>
      <div className="edit-reward-container">
        <form onSubmit={handleReward}>
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
            Cost
            <input
              placeholder={cost || 'cost'}
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </label>
          {errors.cost && <p>{errors.cost}</p>}
          <button type="submit">Save</button>
        </form>
        <button onClick={handleDelete}>Delete This Reward</button>
      </div>
    </>
  );
}

export default EditRewardModal;
