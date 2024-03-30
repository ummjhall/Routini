import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { csrfFetch } from "../../redux/csrf";
import { getUserAvatar } from "../../redux/avatars";

function FixValuesModal() {
  const avatar = useSelector(state => state.avatar.avatar);
  // const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleGoldClick = async () => {
    // closeModal();

    await csrfFetch('/api/avatars/current', {
      method: 'PATCH',
      body: JSON.stringify({
        gold: avatar?.gold + 300
      }),
    });
    dispatch(getUserAvatar());
  };

  return (
    <div className='fixvalues-modal-wrapper'>
      <div className='settings-modal-font fixvalues-heading'>Fix values</div>
      <div className='settings-modal-font'>Here you can get free gold for testing purposes.</div>
      <div className='settings-modal-font fixvalues-gold' onClick={handleGoldClick}>Add 300 Gold</div>
    </div>
  );
}

export default FixValuesModal;
