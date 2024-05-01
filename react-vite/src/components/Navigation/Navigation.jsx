import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import icon from '../../../images/questlog-icon3.jpg';
import './Navigation.css';

function Navigation() {
  const user = useSelector(state => state.session.user);
  const navigate = useNavigate();

  return user ? (
    <div className='nav-wrapper'>
      <div className='nav-wrapper_left'>
        <NavLink to='/'><img className='icon' src={icon} alt='icon' style={{width: '50px'}} /></NavLink>
        <div className='nav_app-name' onClick={() => navigate('/')}>QuestLog</div>
        <div className='nav_link' onClick={() => navigate('/')}>
          <div className='nav_link_text'>Tasks</div>
        </div>
        <div className='nav_link' onClick={() => navigate('/equipment')}>
          <div className='nav_link_text'>Inventory</div>
        </div>
        <div className='nav_link' onClick={() => navigate('/shop')}>
          <div className='nav_link_text'>Shop</div>
        </div>
      </div>
      <ProfileButton />
    </div>
  ) : (
    <div className='nav-wrapper nav-wrapper-signup'>
      <div className='nav-wrapper_left'>
        <NavLink to='/'><img className='icon' src={icon} alt='icon' style={{width: '50px'}} /></NavLink>
        <div className='nav_app-name'>QuestLog</div>
      </div>
      <div className='nav_login' onClick={() => navigate('/login')}>
        Login
      </div>
    </div>
  )
}

export default Navigation;
