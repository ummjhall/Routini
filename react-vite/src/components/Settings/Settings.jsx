import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from '../../redux/avatars';
import { useModal } from '../../context/Modal';
import SettingsModal from './SettingsModal';
import FixValuesModal from './FixValuesModal';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import Wave from '../Footer/Wave';
import Footer from '../Footer';
import './Settings.css';

function Settings() {
  const user = useSelector(state => state.session.user);
  const avatar = useSelector(state => state.avatar.avatar);
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  useEffect(() => {
    if (user && !avatar) dispatch(getUserAvatar());
  }, [user, avatar, dispatch]);

  const handleClickEdit = () => {
    setModalContent(<SettingsModal />);
  }

  const handleClickFixValues = () => {
    setModalContent(<FixValuesModal />);
  };

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
            <div className='settings_account_edit-button' onClick={handleClickEdit}>
              Edit
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Username{' '}</div>
              <div className='settings_account_row-middle'>{user.username}</div>
            </div>
            <div className='settings_account_edit-button' onClick={handleClickEdit}>
              Edit
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Display name{' '}</div>
              <div className='settings_account_row-middle'>{avatar?.name}</div>
            </div>
            <div className='settings_account_edit-button' onClick={handleClickEdit}>
              Edit
            </div>
          </div>
          <div className='settings_account_row'>
            <div className='settings_account_row-subcontainer'>
              <div className='settings_account_row-start'>Password{' '}</div>
              <div className='settings_account_row-middle'>{' '}</div>
            </div>
            <div className='settings_account_edit-button' onClick={handleClickEdit}>
              Edit
            </div>
          </div>
        </div>
        <h2>Character</h2>
        <div className='settings_account_row'>
          <div className='settings_account_row-start'>Stats and Gold</div>
          <div className='settings_account_edit-button' onClick={handleClickFixValues}>
            Fix values
          </div>
        </div>
      </div>
      <Wave />
      <Footer />
    </>
  );
}

export default Settings;
