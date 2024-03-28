import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditTaskModal from '../EditTaskModal/EditTaskModal';

function TaskItemTile({ user, reward }) {
  return (
    <>
      <OpenModalMenuItem
        itemText={reward.title}
        modalComponent={<EditTaskModal user={user} reward={reward} />}
      />
    </>
  );
}

export default TaskItemTile;
