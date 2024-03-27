import EquipmentItem from '../Inventory/EquipmentItem';
import './Shop.css';

function ShopSection({equipment}) {

  return (
    <div>
      <div className='shop-equipment'>
        {equipment && equipment.map(item => (
          <div key={item.id}>
            <EquipmentItem item={item} />
          </div>
        ))}
        {!equipment.length && (<p className='eq-font'>No Equipment available to buy.</p>)}
      </div>
    </div>
  );
}

export default ShopSection;
