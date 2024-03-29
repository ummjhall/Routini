import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from '../../redux/avatars';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SettingsModal from './SettingsModal';
import FixValuesModal from './FixValuesModal';
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
        <div className='settings_account-wrapper'>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Email{' '}</div>
              <div className='settings_account_row-middle'>{user.email}</div>
            </div>
            <div className='settings_account_edit-button'>
              <OpenModalMenuItem itemText='Edit' modalComponent={<SettingsModal />} />
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Username{' '}</div>
              <div className='settings_account_row-middle'>{user.username}</div>
            </div>
            <div className='settings_account_edit-button'>
              <OpenModalMenuItem itemText='Edit' modalComponent={<SettingsModal />} />
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Display name{' '}</div>
              <div className='settings_account_row-middle'>{avatar?.name}</div>
            </div>
            <div className='settings_account_edit-button'>
              <OpenModalMenuItem itemText='Edit' modalComponent={<SettingsModal />} />
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Password{' '}</div>
              <div className='settings_account_row-middle'>{' '}</div>
            </div>
            <div className='settings_account_edit-button'>
              <OpenModalMenuItem itemText='Edit' modalComponent={<SettingsModal />} />
            </div>
          </div>
        </div>
        <h2>Character</h2>
        <div className='settings_account_row'>
          <div className='settings_account_row-start'>Stats and Gold</div>
          <div className='settings_account_edit-button'>
            <OpenModalMenuItem itemText='Fix values' modalComponent={<FixValuesModal />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
