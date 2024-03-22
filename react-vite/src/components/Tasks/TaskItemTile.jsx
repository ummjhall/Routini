import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
function TaskItemTile({user, task}) {
    return (
        <>
          <OpenModalMenuItem
            itemText={task.title}
            // onItemClick={closeMenu}
            modalComponent={<EditTaskModal user={user} task={task} />}
            // customClass={'deleteUserSpotButton'}
          />
        </>
);
}

export default TaskItemTile
