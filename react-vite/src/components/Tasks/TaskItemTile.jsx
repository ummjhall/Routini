import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
// import NewDailyField from "./NewDailyField";
// import { useModal } from "../../context/Modal";
function TaskItemTile({user, task}) {
    // const { closeModal } = useModal()
    return (
        <>
        {/* <NewTaskField /> */}
          <OpenModalMenuItem
            itemText={task.title}
            // onItemClick={closeModal}
            modalComponent={<EditTaskModal user={user} task={task} />}
            // customClass={'deleteUserSpotButton'}
          />
        </>
);
}

export default TaskItemTile
