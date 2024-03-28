import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserReward } from '../../redux/rewards';

function NewRewardField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleNewReward = async (e) => {
    e.preventDefault();

    const newReward = { title };
    if (title) {
      return dispatch(createUserReward(newReward));
    }
  };
  return (
    <form onSubmit={handleNewReward}>
      <label>
        <input
          placeholder={'Create new Reward'}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button>Create Reward</button>
    </form>
  );
}

export default NewRewardField;
