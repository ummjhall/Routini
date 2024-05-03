import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserAvatar } from '../../redux/avatars';
import ViewAvatar from '../ViewAvatar/ViewAvatar';
import Wave from '../Footer/Wave';
import Footer from '../Footer';
import './About.css';

function About() {
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
      <div className='about-wrapper'>
        <h1 className='about-heading'>About</h1>
        <h2>Contributors</h2>
        <div>
          <div className='about-contributors'>
            <div className='about-contributors_name'>Ramon Barros</div>
            <a
              href='https://github.com/ramonpbarros'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://www.linkedin.com/in/ramon-barros-095b0b72'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
          </div>
          <div className='about-contributors'>
            <div className='about-contributors_name'>Justin Hall</div>
            <a
              href='https://github.com/ummjhall'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://www.linkedin.com/in/justin-hall-55175160'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
          </div>
          <div className='about-contributors'>
            <div className='about-contributors_name'>Nikola Milinovich</div>
            <a
              href='https://github.com/nmilinovich'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
            <a
              href='https://www.linkedin.com/in/nikola-milinovich-4b0b261b8'
              target='_blank'
              rel='noopener noreferrer'
            >
              LinkedIn
            </a>
          </div>
        </div>
        <h2 className='about-github'>GitHub</h2>
        <a
          href='https://github.com/ummjhall/Routini'
          target='_blank'
          rel='noopener noreferrer'
        >
          Visit the repository on GitHub
        </a>
        <h2 className='about-stack'>Tech Stack</h2>
        <div>Database: PostgreSQL</div>
        <div>Backend: Python-Flask</div>
        <div>Frontend: JavaScript-React</div>
        <br />
      </div>
      <Wave />
      <Footer />
    </>
  );
}

export default About;
