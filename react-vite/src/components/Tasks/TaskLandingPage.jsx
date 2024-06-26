import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getUserAvatar } from '../../redux/avatars';
import { getTasks } from '../../redux/tasks';
import { getRewards } from '../../redux/rewards';
import CreateAvatar from '../CreateAvatar';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import TaskItemTile from './TaskItemTile';
import NewDailyField from './NewDailyField';
import NewHabitField from './NewHabitField';
import NewToDoField from './NewToDoField';
import NewRewardField from '../Rewards/NewRewardFiled';
import RewardItemTile from '../Rewards/RewardItemTile';
import Wave from '../Footer/Wave';
import Footer from '../Footer';
// import EditTaskModal from '../EditTaskModal/EditTaskModal';
// import EquipmentItem from "./EquipmentItem";

function TaskLandingPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userAvatar = useSelector(state => state.avatar);
  const tasks = useSelector(state => state.tasks);
  const rewards = useSelector(state => state.rewards);
  const userTasks = Object.values(tasks);
  const userRewards = Object.values(rewards);
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
    dispatch(getTasks());
    dispatch(getUserAvatar());
    dispatch(getRewards());
  }, [dispatch]);

  useEffect(() => {
    if (user && userAvatar.isLoaded && !userAvatar.avatar) {
      setModalContent(<CreateAvatar />);
    } else {
      closeModal();
    }
  }, [
    setModalContent,
    userAvatar.isLoaded,
    userAvatar.avatar,
    user,
    closeModal,
  ]);

  if (!user) return <Navigate to="/signup" replace={true} />;

  return (
    <>
      <div className="homePageDiv">
        <ViewAvatar />
        <div className="task-container">
          <div className="habit-container">
            <h1>Habits</h1>
            <NewHabitField />
            {user &&
              habits.map((task) => (
                <TaskItemTile
                  key={task.id}
                  task={task}
                  user={user}
                  avatar={userAvatar.avatar}
                />
              ))}
          </div>
          <div className="daily-container">
            <h1>Dailies</h1>
            <NewDailyField />
            {user &&
              dailies.map((task) => (
                <TaskItemTile
                  key={task.id}
                  task={task}
                  user={user}
                  avatar={userAvatar.avatar}
                />
              ))}
          </div>
          <div className="todo-container">
            <h1>To Do&#39;s</h1>
            <NewToDoField />
            {user &&
              todos.map((task) => (
                <TaskItemTile
                  key={task.id}
                  task={task}
                  user={user}
                  avatar={userAvatar.avatar}
                />
              ))}
          </div>
          <div className="reward-container">
            <h1>Rewards</h1>
            <NewRewardField />
            {userRewards &&
              userRewards.map((reward) => (
                <RewardItemTile
                  key={reward.id}
                  reward={reward}
                  user={user}
                  avatar={userAvatar.avatar}
                />
              ))}
          </div>
        </div>
      </div>
      <Wave />
      <Footer />
    </>
  );
}

export default TaskLandingPage;
