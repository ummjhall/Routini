import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewReward } from '../../redux/rewards';

function NewRewardField() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({});

  const handleNewReward = async (e) => {
    e.preventDefault();

    const newReward = { title, cost: 10 };
    if (title) {
    }
    if (title.trim().length === 0) {
      errors.title = 'Title must have text';
      setErrors(errors)
      setTitle('')
    }
    else {
      return dispatch(createNewReward(newReward)).then(setTitle(''));
    }
  };

  return (
    <form onSubmit={handleNewReward}>
      <input
        className="create-reward-input"
        placeholder={'Add a Reward'}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {errors.title && <p className='error'>{errors.title}</p>}
      {/* <button type="submit">Create Reward</button> */}
    </form>
  );
}

export default NewRewardField;
