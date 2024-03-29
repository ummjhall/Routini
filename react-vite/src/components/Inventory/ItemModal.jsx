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

    let unequip = {};
    if (item.type == 'main' && avatar.equip_main_id == item.id)
      unequip = {equip_main_id: null};
    if (item.type == 'head' && avatar.equip_head_id == item.id)
      unequip = {equip_head_id: null};
    if (item.type == 'armor' && avatar.equip_armor_id == item.id)
      unequip = {equip_armor_id: null};

    await dispatch(removeItemThunk(item.id));
    await dispatch(editUserAvatar({
      gold: avatar.gold + (item.cost / 2),
      ...unequip
    }));
    dispatch(getUserEquipmentThunk());
  };

  // Equip or unequip the item
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
      <div className='item-modal-name'>{item.name}</div>
      <div className='item-modal-description'>{item.description}</div>
      <img className='item-modal-img' src={item.image_url} style={{maxWidth: '120px'}} />
      {shopItem &&
        <div
          className={`item-modal-buttons imb-buy ${avatar.gold - item.cost < 0 ? 'disabled' : ''}`}
          onClick={handleBuy}>
          Buy: {item.cost} Gold
        </div>
      }
      {!shopItem &&
        <div className='item-modal-buttons-container'>
          <div className='item-modal-buttons imb-equip' onClick={handleEquip}>{equipped ? 'Unequip' : 'Equip'}</div>
          <div className='item-modal-buttons imb-sell' onClick={handleSell}>Sell: {item.cost / 2} Gold</div>
        </div>
      }
    </div>
  );
}

export default ItemModal;
