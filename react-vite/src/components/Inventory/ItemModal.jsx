import { useDispatch, useSelector } from 'react-redux';
import { buyItemThunk, getShopEquipmentThunk } from '../../redux/shop';
import { useModal } from '../../context/Modal';
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
    await dispatch(buyItemThunk(item.id));
    await dispatch(editUserAvatar({
      gold: remainingGold
    }));
    dispatch(getShopEquipmentThunk());
  };

  return (
    <div className='item-modal-wrapper'>
      <div>{item.name}</div>
      <div>{item.description}</div>
      <img src={item.image_url} style={{maxWidth: '120px'}} />
      {shopItem &&
        <div>
          <div>Cost: {item.cost}</div>
          <button onClick={handleBuy}>Buy</button>
        </div>
      }
    </div>
  );
}

export default ItemModal;
