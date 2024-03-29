import { useSelector } from 'react-redux';
import './ViewAvatar.css';
import EditAvatar from '../EditAvatar';
import { useModal } from '../../context/Modal';

function ViewAvatar() {
  const user = useSelector((state) => state.session.user);
  const userAvatar = useSelector((state) => state.avatar.avatar);
  const userEquipment = useSelector((state) => state.equipment);
  const { setModalContent } = useModal();

  const headEquipment = Object.values(userEquipment).filter(
    (item) => item.type == 'head'
  );
  const armorEquipment = Object.values(userEquipment).filter(
    (item) => item.type == 'armor'
  );
  const mainEquipment = Object.values(userEquipment).filter(
    (item) => item.type == 'main'
  );

  const handleImgClick = () => {
    setModalContent(
      <EditAvatar
        // avatar={userAvatar}
        headArr={headEquipment}
        armorArr={armorEquipment}
        mainArr={mainEquipment}
      />
    );
  };

  return (
    <>
      <div className="view-avatar-banner">
        <div className="tasks-container">
          <div className="frame">
            <div className="overlay">
              <div className="avatar" onClick={handleImgClick}>
                <img
                  src={userAvatar?.image_url}
                  alt="avatar-image"
                  style={{ display: userAvatar ? 'block' : 'none' }}
                />
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="name">
              <img
                className="name-img"
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711252236/name-icon_f0g6li.png"
                alt="name-icon"
              />
              <div className="name-content">
                <p>{userAvatar?.name}</p>
                <div className="name-small">
                  <small>{user?.username} • </small>
                  <small>Level {userAvatar?.level} Warrior</small>
                </div>
              </div>
            </div>
            <div className="health">
              <img
                className="health-img"
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711252844/health-icon_ppszq6.png"
                alt="health-icon"
              />
              <div className="health-content">
                <div className="health-bar-border">
                  <div
                    className="health-bar"
                    style={{
                      width: `${(userAvatar?.health || 0) * 4}px`,
                    }}
                  ></div>
                </div>
                <small>{userAvatar?.health} / 50</small>
              </div>
            </div>
            <div className="exp">
              <img
                className="exp-img"
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711252236/exp-icon_uu1j9z.png"
                alt="exp-icon"
              />
              <div className="exp-content">
                <div className="exp-bar-border">
                  <div
                    className="exp-bar"
                    style={{
                      width: `${(userAvatar?.exp || 0) * 2.666}px`,
                    }}
                  ></div>
                </div>
                <small>{userAvatar?.exp} / 75</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAvatar;
