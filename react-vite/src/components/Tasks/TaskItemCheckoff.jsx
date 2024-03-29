import { editUserAvatar } from "../../redux/avatars";

function TaskItemCheckoff({user, task}) {
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

  export default TaskItemCheckoff
