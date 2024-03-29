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
        <div className='ae_equipped-items-section'>
          <div className='ae_equipped-items-title'>Main-Hand Item</div>
          <div className='ae_equipped-items-name'>{main?.name}</div>
          <img src={main?.image_url} style={{maxWidth: '100px'}}/>
          {/* <OpenModalMenuItem
            itemImage={<img src={main?.image_url} style={{maxWidth: '100px'}}/>}
            modalComponent={<div>test</div>}
          /> */}
        </div>
        <div className='ae_equipped-items-section'>
          <div className='ae_equipped-items-title'>Headgear</div>
          <div className='ae_equipped-items-name'>{headgear?.name}</div>
          <img src={headgear?.image_url} style={{maxWidth: '100px'}}/>
          {/* <OpenModalMenuItem
            itemImage={<img src={headgear?.image_url} style={{maxWidth: '100px'}}/>}
            modalComponent={<div>test</div>}
          /> */}
        </div>
        <div className='ae_equipped-items-section'>
          <div className='ae_equipped-items-title'>Armor</div>
          <div className='ae_equipped-items-name'>{armor?.name}</div>
          <img src={armor?.image_url} style={{maxWidth: '100px'}}/>
          {/* <OpenModalMenuItem
            itemImage={<img src={armor?.image_url} style={{maxWidth: '100px'}}/>}
            modalComponent={<div>test</div>}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default AvatarEquipment;
