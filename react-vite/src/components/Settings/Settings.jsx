import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from '../../redux/avatars';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import './Settings.css';

function Settings() {
  const user = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar.avatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !avatar) dispatch(getUserAvatar());
  }, [user, avatar, dispatch]);

  if (!user) return <Navigate to='/signup' replace={true} />;

  return (
    <>
      <ViewAvatar />
      <div className='settings-wrapper'>
        <h1>Settings</h1>
        <h2>Account</h2>
        <div>
          <span>Username{' '}</span>
          <span>{user.username}</span>
        </div>
        <div>
          <span>Email{' '}</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>Password{' '}</span>
        </div>
        <div>
          <span>Display name{' '}</span>
          <span>{avatar?.name}</span>
        </div>
        <h2>Character</h2>
        <div>
          <span>Stats and Gold</span>
        </div>
      </div>
    </>
  );
}

export default Settings;
