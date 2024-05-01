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
          <div>
            <a
              href='https://www.linkedin.com/in/ramon-barros-095b0b72'
              target='_blank'
              rel='noopener noreferrer'
            >
              Ramon Barros
            </a>
          </div>
          <div>
            <a
              href='https://www.linkedin.com/in/justin-hall-55175160'
              target='_blank'
              rel='noopener noreferrer'
            >
              Justin Hall
            </a>
          </div>
          <div>
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              Nikola Milinovich
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
