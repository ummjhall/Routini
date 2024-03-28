import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEquipmentThunk } from "../../redux/equipment";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './AvatarEquipment.css';

function AvatarEquipment({ avatar }) {
  const equipment = useSelector(state => state.equipment);
  const dispatch = useDispatch();
  const [ main, setMain ] = useState(null);
  const [ headgear, setHeadgear ] = useState(null);
  const [ armor, setArmor ] = useState(null);

  // console.log(avatar);

  // console.log(main);
  // console.log(headgear);
  // console.log(armor);

  useEffect(() => {
    dispatch(getUserEquipmentThunk());
  }, [dispatch]);

  useEffect(() => {
    setMain(Object.values(equipment).find(item => item.id == avatar.equip_main_id));
    setHeadgear(Object.values(equipment).find(item => item.id == avatar.equip_head_id));
    setArmor(Object.values(equipment).find(item => item.id == avatar.equip_armor_id));
  }, [equipment, avatar.equip_main_id, avatar.equip_head_id, avatar.equip_armor_id]);

  return (
    <div className='avatar-equipment-wrapper'>
      <div className='ae_heading'>Equipped Items</div>
      <div className='ae_equipped-items-container'>
        <div>
          <div>Main-Hand Item</div>
          <div>{main?.name}</div>
        </div>
        <div>
          <div>Headgear</div>
          <div>{headgear?.name}</div>
        </div>
        <div>
          <div>Armor</div>
          <div>{armor?.name}</div>
        </div>
      </div>
    </div>
  );
}

export default AvatarEquipment;
