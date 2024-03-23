import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import icon from '../../../dist/assets/imgs/al-icon.jpg';
import './Navigation.css';

function Navigation() {
  const user = useSelector(state => state.session.user);
  if (!user) return;

  return (
    <div className='nav-wrapper'>
      <div className='nav-wrapper_left'>
        <NavLink to='/'><img className='icon' src={icon} alt='icon' style={{width: '50px'}} /></NavLink>
        <div className='nav_app-name'>AdventureLog</div>
        <NavLink to='/' className={'nav_link'}>Tasks</NavLink>
        <NavLink to='/equipment' className={'nav_link'}>Inventory</NavLink>
        <NavLink to='/shop' className={'nav_link'}>Shop</NavLink>
      </div>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
