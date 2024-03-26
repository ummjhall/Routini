function EquipmentItem({item}) {

  return (
    <div className='equipment_item'>
      <img
        src={item.image_url}
        style={{maxWidth: '120px'}}
      />
    </div>
  );
}

export default EquipmentItem;
