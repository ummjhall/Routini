import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { removeAvatar } from '../../redux/avatars';
import { Navigate } from 'react-router-dom';
import './EditAvatar.css';

function ResetAvatarModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleResetAvatar = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(removeAvatar());
      if (res) {
        Navigate('/');
      }
    } catch (error) {
      console.error('Error resetting avatar:', error);
    }
  };

  return (
    <>
      <div className="modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to reset this avatar? All your information and stats will be reset.</p>
        <div className="modal-btns">
          <button
            className="btn-reset-avatar"
            style={{ marginRight: "20px" }}
            onClick={handleResetAvatar}
          >
            Yes (Reset Avatar)
          </button>
          <button
            className="btn-edit-avatar"

            onClick={closeModal}
          >
            No (Keep Avatar)
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetAvatarModal;
