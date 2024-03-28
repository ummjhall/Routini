import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import { editUserAvatar } from "../../redux/avatars";
import './TaskItemTile.css'
// import NewDailyField from "./NewDailyField";
// import { useModal } from "../../context/Modal";

function TaskItemTile({user, task}) {
  // const { closeModal } = useModal()
  return (
    <div className="taskItemTile">
      <button className="check-off"></button>
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
