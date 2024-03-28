import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { collectItemThunk, getShopEquipmentThunk } from '../../redux/shop';
import { getUserEquipmentThunk, removeItemThunk } from '../../redux/equipment';
import { editUserAvatar } from '../../redux/avatars';

function ItemModal({item, shopItem}) {
  const avatar = useSelector(state => state.avatar.avatar);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [ equipped, setEquipped ] = useState(false);

  // Check whether the user's avatar has the item equipped
  useEffect(() => {
    if (avatar?.equip_main_id == item.id ||
        avatar?.equip_head_id == item.id ||
        avatar?.equip_armor_id == item.id) {
          setEquipped(true);
    } else {
      setEquipped(false);
    }
  }, [avatar.equip_main_id, avatar.equip_head_id, avatar.equip_armor_id, item.id]);

  // User buys the item from the shop
  const handleBuy = async () => {
    const remainingGold = avatar.gold - item.cost;
    if (remainingGold < 0)
      return;

    closeModal();
    await dispatch(collectItemThunk(item.id));
    await dispatch(editUserAvatar({
      gold: remainingGold
    }));
    dispatch(getShopEquipmentThunk());
  };

  // User sells the item from their inventory
  const handleSell = async () => {
    closeModal();
    await dispatch(removeItemThunk(item.id));
    await dispatch(editUserAvatar({
      gold: avatar.gold + (item.cost / 2)
    }));
    dispatch(getUserEquipmentThunk());
  };

  // Equips or unequips the item
  const handleEquip = async () => {
    let data = {};
    if (item.type == 'main') {
      if (equipped) data = {equip_main_id: null};
      else data = {equip_main_id: item.id};
    }
    if (item.type == 'head') {
      if (equipped) data = {equip_head_id: null};
      else data = {equip_head_id: item.id};
    }
    if (item.type == 'armor') {
      if (equipped) data = {equip_armor_id: null};
      else data = {equip_armor_id: item.id};
    }

    await dispatch(editUserAvatar({
      ...data
    }));
  };

  return (
    <div className='item-modal-wrapper'>
      <div>{item.name}</div>
      <div>{item.description}</div>
      <img src={item.image_url} style={{maxWidth: '120px'}} />
      {shopItem &&
        <div>
          <div>Gold: {avatar.gold}</div>
          <div>Cost: {item.cost}</div>
          <button onClick={handleBuy} disabled={avatar.gold - item.cost < 0}>Buy</button>
        </div>
      }
      {!shopItem &&
        <div>
          <button onClick={handleEquip}>{equipped ? 'Unequip' : 'Equip'}</button>
          <div>Gold: {avatar.gold}</div>
          <div>Selling price: {item.cost / 2}</div>
          <button onClick={handleSell}>Sell</button>
        </div>
      }
    </div>
  );
}

export default ItemModal;
