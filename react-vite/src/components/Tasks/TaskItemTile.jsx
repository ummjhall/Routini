import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { editUserAvatar } from "../../redux/avatars";
import './TaskItemTile.css'
import TaskItemCheckoff from "./TaskItemCheckoff";
// import NewDailyField from "./NewDailyField";
// import { useModal } from "../../context/Modal";

function TaskItemTile({user, task, avatar}) {
  // const { closeModal } = useModal()
  return (
    <div className="taskItemTile">
      <TaskItemCheckoff className="check-off" user={user} task={task} avatar={avatar}/>
      <div className="taskModalButton">
        <OpenModalMenuItem
          itemText={task.title}
          // onItemClick={closeModal}
          modalComponent={<EditTaskModal user={user} task={task} />}
          customClass={'taskModalButton'}
        />
      </div>
    </div>
  );
}

export default TaskItemTile
