import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="overlay">
          <div className="container">
            <h1>Routini</h1>
            <Link
              className="link"
              to="https://github.com/ummjhall/Routini"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </Link>
            <Link className="link" to="#">
              Contact
            </Link>
            <p>© Routini 2024</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
