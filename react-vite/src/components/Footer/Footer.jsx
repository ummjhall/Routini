import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="overlay">
        <div className="container">
          <h1>QuestLog</h1>
          <Link
            className="link"
            to="https://github.com/ummjhall/Routini"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          <p>© QuestLog 2024</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
