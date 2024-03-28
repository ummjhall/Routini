import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './AvatarEquipment.css';

function AvatarEquipment() {

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
