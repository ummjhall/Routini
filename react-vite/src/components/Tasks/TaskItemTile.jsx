// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useDispatch } from 'react-redux';
import OpenModalTaskItem from './OpenModalTaskItem';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
// import { editUserAvatar } from "../../redux/avatars";
import './TaskItemTile.css';
import TaskItemCheckoff from './TaskItemCheckoff';
import { removeTask } from '../../redux/tasks';
import { editUserAvatar } from '../../redux/avatars';

function TaskItemTile({ user, task, avatar }) {
  const dispatch = useDispatch();

  const getBackgroundColor = () => {
    switch (task?.difficulty) {
      case 1:
        return '#26CC8F';
      case 2:
        return '#FFBF5D';
      case 3:
        return '#FF944C';
      case 4:
        return '#d95050';
      default:
        return 'transparent';
    }
  };

  if (task.type === 'to-do') {
    console.log(Date.now())
    console.log(new Date(), Date.now(task.due_date))

    if (task.due_date && Date.parse(task.due_date) < Date.now()) {
      const updatedAvatar = {
        health: avatar.health - (5/task.difficulty),
        exp: avatar.exp,
        gold: avatar.gold,
        level: avatar.level,
      };
      dispatch(removeTask(task.id));
      dispatch(editUserAvatar(updatedAvatar))
    }
  }

  return (
    <div className="taskItemTile">
      <div
        className="checkbox-container"
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <TaskItemCheckoff
          className="check-off"
          user={user}
          task={task}
          avatar={avatar}
        />
      </div>
      <div className="taskModalButton">
        <OpenModalTaskItem
          itemText={task.title}
          modalComponent={<EditTaskModal user={user} task={task} className='taskModalClick'/>}
          customClass={'taskModalButton'}
          task={task}
        />
      </div>
    </div>
  );
}

export default TaskItemTile;
