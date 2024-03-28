import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewReward } from '../../redux/rewards';

function NewRewardField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleNewReward = async (e) => {
    e.preventDefault();

    const newReward = { title };
    if (title) {
      return dispatch(createNewReward(newReward)).then(setTitle(''));
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
      <button type="submit">Create Reward</button>
    </form>
  );
}

export default NewRewardField;
