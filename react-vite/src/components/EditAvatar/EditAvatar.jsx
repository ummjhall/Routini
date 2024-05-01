import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserAvatar } from '../../redux/avatars';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import AvatarEquipment from './AvatarEquipment';
import './EditAvatar.css';
import ResetAvatarModal from './ResetAvatarModal';
import OpenModalButton from '../OpenModalButton';

function EditAvatar() {
  const avatar = useSelector((state) => state.avatar.avatar);
  const dispatch = useDispatch();
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      editUserAvatar({
        name: name.trim() || avatar.name,
        bio: bio.trim() || avatar.bio,
      })
    );

    setFormDisplayed(false);
  };

  return (
    <div className="edit-avatar-modal-wrapper">
      <div className="edit-avatar-container">
        <div className="edit-avatar">
          <ViewAvatar hideCurrency={true} />
        </div>
      </div>
      <div className="edit-avatar-content">
        <div className="currency-stats">
          <div className="gold">
            <img
              className="gold-img"
              src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711434244/coin_l2gdi1.png"
              alt="gold"
            />
            {avatar?.gold}
          </div>
          <div className="gems">
            <img
              className="gems-img"
              src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711434244/gem_dvrsry.png"
              alt="gem"
            />{' '}
            {avatar?.gems}
          </div>
        </div>
        <hr />
        {formDisplayed ? (
          <>
            <form onSubmit={handleSubmit} className="edit-avatar-form">
              <label>Name</label>
              <input
                type="text"
                value={name}
                placeholder="Choose a new moniker for Thyself"
                onChange={(e) => setName(e.target.value)}
              />

              <label>Biography</label>
              <textarea
                type="text"
                value={bio}
                placeholder="Pray, divulge thyself, adventurer"
                onChange={(e) => setBio(e.target.value)}
              />
              <div className="btns">
                <div>
                  <button className="btn-edit-avatar" type="submit">
                    Save
                  </button>
                </div>
                <div>
                  <button
                    className="btn-reset-avatar"
                    onClick={() => {
                      setFormDisplayed(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="avatar-info">
            <h3>Name</h3>
            <p className="secondary-font">{avatar?.name}</p>
            <h3>About</h3>
            <p className="secondary-font">
              {avatar
                ? avatar?.bio
                : "This Adventurer hasn't added a description."}
            </p>
            <hr />
            <AvatarEquipment avatar={avatar} />
            <div className="btns">
              <div>
                <button
                  className="btn-edit-avatar"
                  onClick={() => {
                    setFormDisplayed(true);
                  }}
                >
                  Edit Avatar
                </button>
              </div>
              <div>
                <OpenModalButton
                  buttonText="Reset Avatar"
                  modalComponent={<ResetAvatarModal />}
                  className="btn-reset-avatar"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditAvatar;
