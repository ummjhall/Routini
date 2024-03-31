import { editUserAvatar } from '../../redux/avatars';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function TaskItemCheckoff({ task, avatar }) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const completeTask = async (e) => {
    e.preventDefault();
    let expGain = task.difficulty * 2;
    let updatedLevel = avatar.level;
    let updatedExp = avatar.exp + expGain;

    if (updatedExp >= 75) {
      const remainingExp = updatedExp - 75;
      updatedLevel++;
      updatedExp = remainingExp;
    }

    const updatedAvatar = {
      name: avatar.name,
      bio: avatar.bio,
      health: avatar.health,
      exp: updatedExp,
      gold: avatar.gold + task.difficulty * 2,
      level: updatedLevel,
    };

    return dispatch(editUserAvatar(updatedAvatar))
      .then(setDisabled(true))
      .then(setTimeout(() => setDisabled(false), 1000 * 60 * 60 * 24));
  };

  return (
    <button
      disabled={disabled}
      onClick={completeTask}
      className="check-off"
    ></button>
  );
}

export default TaskItemCheckoff;
