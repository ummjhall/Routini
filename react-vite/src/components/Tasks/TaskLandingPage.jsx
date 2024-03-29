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
import NewRewardField from '../Rewards/NewRewardFiled';
import { getRewards } from '../../redux/rewards';
import RewardItemTile from '../Rewards/RewardItemTile';
// import EditTaskModal from '../EditTaskModal/EditTaskModal';
// import EquipmentItem from "./EquipmentItem";

function TaskLandingPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userTasks = useSelector((state) => Object.values(state.tasks));
  const userAvatar = useSelector((state) => state?.avatar?.avatar);
  const userRewards = useSelector((state) => Object.values(state.rewards));
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
    dispatch(getUserAvatar());
    dispatch(getRewards());
  }, [dispatch]);

  if (!user) return <Navigate to="/signup" replace={true} />;

  return (
    <div className='homePageDiv'>
      <ViewAvatar />
      <div className="task-container">
        <div className="daily-container">

            <h1>Daily</h1>
            <NewDailyField />
          {user &&
            dailies.map((task) => (
              <div className='task-tile' key={task.id}>
                <TaskItemTile  task={task} user={user}/>
              </div>
            ))}
        </div>
        <div className="habit-container">
          <h1>Habit</h1>
            <NewHabitField />
          {user &&
            habits.map((task) => (
              <div className='task-tile' key={task.id}>
                <TaskItemTile  task={task} user={user}/>
              </div>
            ))}
        </div>
        <div className="todo-container">
          <h1>To-do's</h1>
            <NewToDoField />
          {user &&
            todos.map((task) => (
              <div className='task-tile' key={task.id}>
                <TaskItemTile  task={task} user={user}/>
              </div>
            ))}
        </div>
        <div className="reward-container">
          <NewRewardField />
          {userRewards &&
            userRewards.map((reward) => (
              <RewardItemTile key={reward.id} reward={reward} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TaskLandingPage;
