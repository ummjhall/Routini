import { useModal } from '../../context/Modal';
import './RewardItemTile.css';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  reward,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  return (
    <div className="reward-tile-content" onClick={onClick}>
      <div className="reward-title">
        <p>{itemText}</p>
        <small>{reward.description}</small>
      </div>
      <div className="reward-cost">
        <img
          className="reward-coin-img"
          src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711434244/coin_l2gdi1.png"
          alt="coin image"
        />
        {reward.cost}
      </div>
    </div>
  );
}

export default OpenModalMenuItem;
