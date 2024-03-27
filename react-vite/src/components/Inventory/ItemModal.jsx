import { useDispatch } from 'react-redux';
import { buyItemThunk, getShopEquipmentThunk } from '../../redux/shop';
import { useModal } from '../../context/Modal';

function ItemModal({item, shopItem}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleBuy = async () => {
    closeModal();
    await dispatch(buyItemThunk(item.id));
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
