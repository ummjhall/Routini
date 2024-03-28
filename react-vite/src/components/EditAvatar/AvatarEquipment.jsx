import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './AvatarEquipment.css';

function AvatarEquipment() {
  const equipment = useSelector(state => state.equipment);
  const equipped = Object.values(equipment).filter(item => item.equipped);
  console.log(equipped);

  return (
    <div className='avatar-equipment-wrapper'>
      <div className='ae_heading'>Equipped Items</div>
      <div className='ae_equipped-items-container'>
        <div>
          <div>Main-Hand Item</div>
        </div>
        <div>
          <div>Headgear</div>
        </div>
        <div>
          <div>Armor</div>
        </div>
      </div>
    </div>
  );
}

export default AvatarEquipment;
