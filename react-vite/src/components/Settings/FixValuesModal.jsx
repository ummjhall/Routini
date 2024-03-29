import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { csrfFetch } from "../../redux/csrf";
import { getUserAvatar } from "../../redux/avatars";

function FixValuesModal() {
  // const avatar = useSelector(state => state.avatar.avatar);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleGoldClick = async () => {
    closeModal();

    await csrfFetch('/api/avatars/current', {
      method: 'PATCH',
      body: JSON.stringify({
        gold: 500
      }),
    });
    dispatch(getUserAvatar());
  };

  return (
    <div className='fixvalues-modal-wrapper'>
      <div className='fixvalues-heading'>Fix values</div>
      <div>Here you can get free gold for testing purposes.</div>
      <span className='fixvalues-gold' onClick={handleGoldClick}>Set gold to 500</span>
    </div>
  );
}

export default FixValuesModal;
