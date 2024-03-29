import { editUserAvatar } from '../../redux/avatars';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
function TaskItemCheckoff({ task, avatar }) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const completeTask = async (e) => {
    e.preventDefault();
    const updatedAvatar = {
      name: avatar.name,
      bio: avatar.bio,
      health: avatar.health,
      exp: avatar.exp + task.difficulty * 15,
      gold: avatar.gold + task.difficulty * 5,
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
