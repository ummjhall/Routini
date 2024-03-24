import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';

function ProfileButton() {
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div>
      <FaUserCircle className='profile-button' onClick={toggleMenu}/>
      {showMenu && (
        <div className={'profile-dropdown'} ref={ulRef}>
          <div>
            <div className='profile-dropdown_username'>{user.username}</div>
            <div className='profile-dropdown_email'>{user.email}</div>
            <div className='profile-dropdown_logout' onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
