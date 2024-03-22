import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getTasks } from "../../redux/tasks";
// import EquipmentItem from "./EquipmentItem";

function TaskLandingPage() {
  const user = useSelector(state => state.session.user);
  const userTasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const dailies = [];
  const habits = [];
  const todos = [];
  for (const task of Object.values(userTasks)) {
    console.log('HELLO: ', userTasks)
    if (task.type == 'daily') dailies.push(task);
    if (task.type == 'habit') habits.push(task);
    if (task.type == 'to-do') todos.push(task);
  }
  console.log(dailies)
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <div>
        <h1>Tasks</h1>
        <div className="task-container">
            {user && dailies.length && dailies.map(task => (
            <p key={task.id}>{task.title}</p>
            ))}
        </div>
        <div>
            {user && habits.length && habits.map(task => (
            <p key={task.id}>{task.title}</p>
            ))}
        </div>
        <div>
            {user && todos.length && todos.map(task => (
            <p key={task.id}>{task.title}</p>
            ))}
        </div>
    </div>
  )
//   return (
//     <div>
//       <h1>Equipment</h1>
//       <div>
//         <span>Main-Hand Item{' '}</span>
//         <span>{mainEquipment.length}</span>
//         <div>
//           {user && mainEquipment && mainEquipment.map(item => (
//             <p key={item.id}>{item.name}</p>
//           ))}
//           {!mainEquipment.length && (<p>You don&apos;t own any of these.</p>)}
//         </div>
//       </div>
//       <div>
//         <span>Headgear{' '}</span>
//         <span>{headEquipment.length}</span>
//         <div>
//           {user && headEquipment && headEquipment.map(item => (
//             <p key={item.id}>{item.name}</p>
//           ))}
//           {!headEquipment.length && (<p>You don&apos;t own any of these.</p>)}
//         </div>
//       </div>
//       <div>
//         <span>Armor{' '}</span>
//         <span>{armorEquipment.length}</span>
//         <div>
//           {user && armorEquipment && armorEquipment.map(item => (
//             <p key={item.id}>{item.name}</p>
//           ))}
//           {!armorEquipment.length && (<p>You don&apos;t own any of these.</p>)}
//         </div>
//       </div>
//     </div>
//   );
}

export default TaskLandingPage;
