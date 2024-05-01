import ViewAvatar from '../ViewAvatar/ViewAvatar';
import './About.css';

function About() {

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
              href='https://www.linkedin.com'
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
      </div>
    </>
  );
}

export default About;
