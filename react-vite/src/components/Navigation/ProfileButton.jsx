import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';
import EditAvatar from '../EditAvatar';
// import OpenModalMenuItem from './OpenModalMenuItem';

function ProfileButton() {
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ulRef = useRef();
  const { setModalContent } = useModal();
  const [showMenu, setShowMenu] = useState(false);

  // Handle the menu visibility
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  // Open the Avatar modal from the profile menu
  const openProfile = () => {
    closeMenu();
    setModalContent(<EditAvatar />);
  };

  const goToSettings = () => {
    navigate('/settings');
    closeMenu();
  };

  const gotToAbout = () => {
    navigate('/about');
    closeMenu();
  };

  return (
    <div>
      <FaUserCircle className='profile-button' onClick={toggleMenu}/>
      {showMenu && (
        <div className={'profile-dropdown'} ref={ulRef}>
          <div>
            <div className='pd-font profile-dropdown_username'>{user.username}</div>
            <div className='pd-font profile-dropdown_email'>{user.email}</div>
            <div className='pd-font profile-dropdown_profile' onClick={openProfile}>Profile</div>
            <div className='pd-font profile-dropdown_settings' onClick={goToSettings}>Settings</div>
            <div className='pd-font profile-dropdown_about' onClick={gotToAbout}>About</div>
            <div className='pd-font profile-dropdown_logout' onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
