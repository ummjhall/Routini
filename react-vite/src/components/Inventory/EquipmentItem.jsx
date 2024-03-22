function EquipmentItem({item}) {

  return (
    <div>
      <img
        src={item.image_url}
        style={{maxWidth: '120px'}}
      />
    </div>
  );
}

export default EquipmentItem;
