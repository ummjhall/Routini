import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserEquipmentThunk } from "../../redux/equipment";
// import EquipmentItem from "./EquipmentItem";

function Equipment() {
  const user = useSelector(state => state.session.user);
  const userEquipment = useSelector(state => state.equipment);
  const dispatch = useDispatch();

  const mainEquipment = [];
  const headEquipment = [];
  const armorEquipment = [];
  for (const item of Object.values(userEquipment)) {
    if (item.type == 'main') mainEquipment.push(item);
    if (item.type == 'head') headEquipment.push(item);
    if (item.type == 'armor') armorEquipment.push(item);
  }

  useEffect(() => {
    dispatch(getUserEquipmentThunk());
  }, [dispatch]);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <div>
      <h1>Equipment</h1>
      <div>
        <span>Main-Hand Item{' '}</span>
        <span>{mainEquipment.length}</span>
        <div>
          {user && mainEquipment && mainEquipment.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
          {!mainEquipment.length && (<p>You don&apos;t own any of these.</p>)}
        </div>
      </div>
      <div>
        <span>Headgear{' '}</span>
        <span>{headEquipment.length}</span>
        <div>
          {user && headEquipment && headEquipment.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
          {!headEquipment.length && (<p>You don&apos;t own any of these.</p>)}
        </div>
      </div>
      <div>
        <span>Armor{' '}</span>
        <span>{armorEquipment.length}</span>
        <div>
          {user && armorEquipment && armorEquipment.map(item => (
            <p key={item.id}>{item.name}</p>
          ))}
          {!armorEquipment.length && (<p>You don&apos;t own any of these.</p>)}
        </div>
      </div>
    </div>
  );
}

export default Equipment;
