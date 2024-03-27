import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ItemModal from "./ItemModal";

function EquipmentItem({item}) {

  return (
    <div className='equipment_item'>
      <OpenModalMenuItem
        itemImage={
          <img
            src={item.image_url}
            style={{maxWidth: '120px'}}
          />
        }
        modalComponent={<ItemModal />}
      />
    </div>
  );
}

export default EquipmentItem;
