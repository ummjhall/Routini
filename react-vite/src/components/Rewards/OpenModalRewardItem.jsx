import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { editUserAvatar } from '../../redux/avatars';
import './RewardItemTile.css';

function OpenModalRewardItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  reward,
  avatar,
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const dispatch = useDispatch();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') onItemClick();
  };

  const useReward = async (e) => {
    e.preventDefault();
    const updatedAvatar = {
      gold: avatar.gold - reward.cost,
    };

    return dispatch(editUserAvatar(updatedAvatar)).then(
      alert(
        `${reward.cost} gold was taken from your avatar to use your ${reward.title} reward`
      )
    );
  };

  return (
    <div className="reward-tile-content">
      <div className="reward-title" onClick={onClick}>
        <p>{itemText}</p>
        <small>{reward.description}</small>
      </div>
      <div onClick={useReward} className="reward-cost">
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

export default OpenModalRewardItem;
