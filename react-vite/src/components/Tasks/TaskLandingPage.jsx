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
// import EquipmentItem from "./EquipmentItem";

function TaskLandingPage() {
  const user = useSelector((state) => state.session.user);
  const userTasks = useSelector((state) => Object.values(state.tasks));
  const userAvatar = useSelector((state) => state?.avatar?.avatar);
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  const dailies = [];
  const habits = [];
  const todos = [];
  for (const task of userTasks) {
    // console.log('HELLO: ', userTasks)
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
    </div>
  );
}

export default TaskLandingPage;
