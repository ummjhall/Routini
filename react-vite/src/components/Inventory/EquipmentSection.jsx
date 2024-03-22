import EquipmentItem from "./EquipmentItem";
import './equipment.css'

function EquipmentSection({heading, array}) {

  return (
    <div className='equipment-section'>
      <div className='equipment-section_heading'>
        <div>{heading}</div>
        <div>{array.length}</div>
      </div>
      <div>
        {array && array.map(item => (
          <div key={item.id}>
            <EquipmentItem item={item} />
          </div>
        ))}
        {!array.length && (<p>You don&apos;t own any of these.</p>)}
      </div>
    </div>
  );
}

export default EquipmentSection;
