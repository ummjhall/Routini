import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { collectItemThunk, getShopEquipmentThunk } from '../../redux/shop';
import { getUserEquipmentThunk, removeItemThunk } from '../../redux/equipment';
import { editUserAvatar } from '../../redux/avatars';

function ItemModal({item, shopItem}) {
  const avatar = useSelector(state => state.avatar.avatar);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

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

  const handleSell = async () => {
    closeModal();
    await dispatch(removeItemThunk(item.id));
    await dispatch(editUserAvatar({
      gold: avatar.gold + (item.cost / 2)
    }));
    dispatch(getUserEquipmentThunk());
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
          <div>Gold: {avatar.gold}</div>
          <div>Selling price: {item.cost / 2}</div>
          <button onClick={handleSell}>Sell</button>
        </div>
      }
    </div>
  );
}

export default ItemModal;
