import { useSelector } from 'react-redux';
// import { useAuth } from '../../context/AuthProvider';
import LandingPage from '../LandingPage';

function ConditionalLandingPage() {
  // const { isLoggedIn } = useAuth();
  const sessionUser = useSelector((state) => state.session.user);

  return sessionUser ? <h1>Tasks Page</h1> : <LandingPage />;
}

export default ConditionalLandingPage;
