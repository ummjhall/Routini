import EquipmentItem from "./EquipmentItem";
import './Equipment.css';

function EquipmentSection({heading, array}) {

  return (
    <div className='equipment-section'>
      <div className='equipment-section_heading'>
        <div className='eq-font'>{heading}</div>
        <div className='eq-font'>{array.length}</div>
      </div>
      <div>
        {array && array.map(item => (
          <div key={item.id}>
            <EquipmentItem item={item} />
          </div>
        ))}
        {!array.length && (<p className='eq-font'>You don&apos;t own any of these.</p>)}
      </div>
    </div>
  );
}

export default EquipmentSection;
