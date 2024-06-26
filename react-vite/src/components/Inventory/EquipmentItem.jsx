import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ItemModal from "./ItemModal";

function EquipmentItem({item}) {

  return (
    <div className='equipment_item'>
      <OpenModalMenuItem
        itemImage={
          <img
            className='equipment_item-image'
            src={item.image_url}
            style={{maxWidth: '120px'}}
          />
        }
        modalComponent={<ItemModal item={item} shopItem={!item.user_id} />}
      />
    </div>
  );
}

export default EquipmentItem;
