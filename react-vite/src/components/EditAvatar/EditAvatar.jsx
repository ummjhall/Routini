import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUserAvatar, removeAvatar } from '../../redux/avatars';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import AvatarEquipment from './AvatarEquipment';
import './EditAvatar.css';

function EditAvatar() {
  const avatar = useSelector((state) => state.avatar.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      editUserAvatar({
        name: name.trim() || avatar.name,
        bio: bio.trim() || avatar.bio,
      })
    );

    if (res) {
      console.log('Avatar updated');
    }
  };

  const handleResetAvatar = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await dispatch(removeAvatar());
      if (res) {
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error resetting avatar:', error);
    }
  };

  return (
    <div className='edit-avatar-modal-wrapper'>
      <div className="edit-avatar-container">
        <div className="edit-avatar">
          <ViewAvatar />
        </div>
      </div>
      {isLoading ? (
        <div className="spinner">
          <div className="spinner-content">
            <LoadingSpinner />
            <h3>Resetting Avatar...</h3>
          </div>
        </div>
      ) : (
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
          {/* <div className="edit-avatar-equipment">
          {headArr &&
            headArr.map((item) => (
              <div key={item.id}>
                <img
                  className="head-img"
                  src={item.image_url}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          {armorArr &&
            armorArr.map((item) => (
              <div key={item.id}>
                <img
                  className="head-img"
                  src={item.image_url}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          {mainArr &&
            mainArr.map((item) => (
              <div key={item.id}>
                <img
                  className="head-img"
                  src={item.image_url}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
        </div> */}
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
              <p className='secondary-font'>{avatar?.name}</p>
              <h3>About</h3>
              <p className='secondary-font'>
                {avatar
                  ? avatar?.bio
                  : 'This Adventurer hasn&#39;t added a description.'}
              </p>
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
                  <button
                    onClick={handleResetAvatar}
                    className="btn-reset-avatar"
                  >
                    Reset Avatar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EditAvatar;
