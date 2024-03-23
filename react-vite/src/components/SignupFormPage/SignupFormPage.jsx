import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkSignup } from '../../redux/session';
import './SignupForm.css';
import MouseScroll from '../MouseScroll/MouseScroll';
import Footer from '../Footer/Footer';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const emailInputRef = useRef(null);

  useEffect(() => {
    const emailInput = emailInputRef.current;
    if (emailInput) {
      emailInput.focus();
      emailInput.blur();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          'Confirm Password field must be the same as the Password field',
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className="landpage">
        <div className="overlay">
          <div className="container">
            <div className="banner">
              <img
                className="banner_img"
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711057340/landpage_t0vcr5.png"
                alt="landpage_backgroud_image"
              />
              <h1>Embark on your epic journey of self-improvement!</h1>
              <p>
                Join our growing band of adventurers and start leveling up your
                life, one quest at a time. Will you rise to the challenge?
              </p>
            </div>

            <div className="signup">
              <h1>Begin your Adventure!</h1>
              <h3>Prepare for your adventure by creating your character: </h3>
              <p>
                Choose your adventurer username carefully! It should be 1 to 20
                characters long, with only letters (a to z), numbers (0 to 9),
                hyphens, or underscores. Keep it clean to avoid the dragon&#39;s
                wrath!
              </p>{' '}
              {errors.server && <p>{errors.server}</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {errors.username && <p>{errors.username}</p>}
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p>{errors.email}</p>}
                <input
                  type="password"
                  className="input_bg"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && <p>{errors.password}</p>}
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <p>
                  Brace yourself! By clicking below, you vow to honor the Terms
                  of Service and Privacy Policy scrolls. Adventure awaits!
                </p>
                <button className="btn-signup" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
            <MouseScroll />
          </div>
        </div>
      </div>

      <div className="section_features">
        <div className="container">
          <h1>Enter the Adventure of Your Life!</h1>
          <p>
            Routini offers a free journey-building and productivity app that
            turns your everyday life into an exhilarating quest. With
            captivating rewards and daring consequences to drive your path, and
            a fellowship of kindred spirits to encourage you, Routini is your
            ticket to overcoming obstacles and unlocking your true potential for
            health, productivity, and joy.
          </p>
          <div className="cards">
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711073879/landpage_task_card_wshsap.png"
                alt="card_one"
              />
              <h3>Embark on Your Quest to Mastery</h3>
              <p>
                Harness the power of Routini to track and conquer your daily
                Habits, Quests, and To-Do lists. Whether you wield the mobile
                app or the web interface, your journey to greatness awaits!
              </p>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711074668/landpage_rewards_card_enp3fm.png"
                alt="card_one"
              />
              <h3>Claim Rewards for Your Quests</h3>
              <p>
                Vanquish tasks to ascend your Avatar and unveil in-game
                treasures like battle gear, enigmatic companions, mystical
                abilities, and daring adventures!
              </p>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711075525/landpage_equip_card_q5f6ts.png"
                alt="card_one"
              />
              <h3>Discover Enchanted Gear!</h3>
              <p>
                Exchange your hard-earned Gold for enchanted equipment to level
                up your quest and unlock thrilling adventures
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="waves_banner">
        <div className="waves">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M-0.84,51.81 C145.31,-37.97 322.51,85.38 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
          </svg>
        </div>
      </div>

      <div className="section_improvements">
        <div className="container">
          <h1>Adventurers Harness Routini&#39;s Power!</h1>
          <div className="cards">
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711076377/landpage_health_card_her3ln.png"
                alt="card_one"
                style={{ borderRadius: '50%' }}
              />
              <h3>Vitality and Vigor</h3>
              <p>
                Struggling to maintain healthy habits like flossing or hitting
                the gym? With Routini, your journey to wellness becomes an
                exciting adventure!
              </p>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711076724/landpage_study_card_tr5fn1.png"
                alt="study_card"
                style={{ borderRadius: '50%' }}
              />
              <h3>Studies and Careers</h3>
              <p>
                From mastering scrolls for your scholarly mentors to fulfilling
                tasks for your esteemed profession, managing your endeavors is a
                breeze with our quest-tracking tools!
              </p>
            </div>
            <div className="card">
              <img
                src="https://res.cloudinary.com/drv1e8rjp/image/upload/v1711076868/landpage_more_card_t2ca4z.png"
                alt="more_card"
                style={{ borderRadius: '50%' }}
              />
              <h3>Endless Adventures Await!</h3>
              <p>
                With Routini&#39;s versatile quest log, the possibilities are as
                vast as the realms of the imagination! Craft epic sagas,
                prioritize self-care quests, or embark on any other quest you
                desire — the choice is yours!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="waves_banner_two">
        <div className="waves_two">
          <svg viewBox="0 0 500 150" preserveAspectRatio="none">
            <path d="M-1.13,26.16 C156.32,123.85 358.92,-4.43 501.13,35.04 L500.00,0.00 L0.00,0.00 Z"></path>
          </svg>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignupFormPage;
