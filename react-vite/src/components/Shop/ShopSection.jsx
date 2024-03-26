import EquipmentItem from '../Inventory/EquipmentItem';
import './Shop.css';

function ShopSection({equipment}) {

  return (
    <div>
      <div>
        {equipment && equipment.map(item => (
          <div key={item.id}>
            <EquipmentItem item={item} />
          </div>
        ))}
        {!equipment.length && (<p>No Equipment available to buy.</p>)}
      </div>
    </div>
  );
}

export default ShopSection;
