import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getTasks } from '../../redux/tasks';
import TaskItemTile from './TaskItemTile';
import { getUserAvatar } from '../../redux/avatars';
import CreateAvatar from '../CreateAvatar';
import { useModal } from '../../context/Modal';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import NewDailyField from './NewDailyField';
import NewHabitField from './NewHabitField';
import NewToDoField from './NewToDoField';
<<<<<<< HEAD
import NewRewardField from '../Rewards/NewRewardFiled';
// import EditTaskModal from '../EditTaskModal/EditTaskModal';
import { getRewards } from '../../redux/rewards';
import RewardItemTile from '../Rewards/RewardItemTile'
=======
// import EditTaskModal from '../EditTaskModal/EditTaskModal';
>>>>>>> 3e97bba709304c96a3b3af20f44bacb458bcacc0
// import EquipmentItem from "./EquipmentItem";

function TaskLandingPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userTasks = useSelector((state) => Object.values(state.tasks));
  const userAvatar = useSelector((state) => state?.avatar?.avatar);
  const userRewards = useSelector((state) => state?.rewards?.Rewards);
  const { setModalContent, closeModal } = useModal();

  const dailies = [];
  const habits = [];
  const todos = [];
  for (const task of userTasks) {
    if (task.type == 'daily') dailies.push(task);
    if (task.type == 'habit') habits.push(task);
    if (task.type == 'to-do') todos.push(task);
  }

  useEffect(() => {
    if (user && !userAvatar) {
      setModalContent(<CreateAvatar />);
    } else {
      closeModal();
    }
  }, [setModalContent, userAvatar, user, closeModal]);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getRewards());
    dispatch(getUserAvatar());
  }, [dispatch]);

  if (!user) return <Navigate to="/signup" replace={true} />;

  return (
    <div>
      <ViewAvatar />
      <h1>Tasks</h1>
      <div className="task-container">
        <div className="daily-container">
          <NewDailyField />
          {user &&
            dailies.length &&
            dailies.map((task) => (
              <TaskItemTile key={task.id} task={task} user={user} />
            ))}
        </div>
        <div className="habit-container">
          <NewHabitField />
          {user &&
            habits.length &&
            habits.map((task) => (
              <TaskItemTile key={task.id} task={task} user={user} />
            ))}
        </div>
        <div className="todo-container">
          <NewToDoField />
          {user &&
            todos.length &&
            todos.map((task) => (
              <TaskItemTile key={task.id} task={task} user={user} />
            ))}
        </div>
      </div>
      <div className="reward-container">
        <NewRewardField />
        {user &&
          userRewards.map((reward) => (
            <RewardItemTile key={reward.id} reward={reward}/>
          ))}
      </div>
    </div>
  );
}

export default TaskLandingPage;
