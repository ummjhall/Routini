import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from '../../redux/avatars';
import { getUserEquipmentThunk } from '../../redux/equipment';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import EquipmentSection from './EquipmentSection';

function Equipment() {
  const user = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar.avatar);
  const userEquipment = useSelector(state => state.equipment);
  const dispatch = useDispatch();

  const mainEquipment = Object.values(userEquipment).filter(item => item.type == 'main');
  const headEquipment = Object.values(userEquipment).filter(item => item.type == 'head');
  const armorEquipment = Object.values(userEquipment).filter(item => item.type == 'armor');

  useEffect(() => {
    if (user && !avatar) dispatch(getUserAvatar());
    dispatch(getUserEquipmentThunk());
  }, [user, avatar, dispatch]);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <>
      <ViewAvatar />
      <div className='equipment-wrapper'>
        <h1 className='equipment_heading'>Equipment</h1>
        <div>
          <EquipmentSection heading='Main-Hand Item' array={mainEquipment} />
        </div>
        <div>
          <EquipmentSection heading='Headgear' array={headEquipment} />
        </div>
        <div>
          <EquipmentSection heading='Armor' array={armorEquipment} />
        </div>
      </div>
    </>
  );
}

export default Equipment;
