// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import OpenModalTaskItem from "./OpenModalTaskItem";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
// import { editUserAvatar } from "../../redux/avatars";
import './TaskItemTile.css'
import TaskItemCheckoff from "./TaskItemCheckoff";


function TaskItemTile({user, task, avatar}) {
  return (
    <div className="taskItemTile">
      <TaskItemCheckoff className="check-off" user={user} task={task} avatar={avatar}/>
      <div className="taskModalButton">
        <OpenModalTaskItem
          itemText={task.title}
          modalComponent={<EditTaskModal user={user} task={task} />}
          customClass={'taskModalButton'}
          task={task}
        />
      </div>
    </div>
  );
}

export default TaskItemTile
