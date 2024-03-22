import { useState } from 'react';
import { thunkLogin } from '../../redux/session';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential: email,
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
      <div className="section_login">
        <div className="overlay">
          <div className="container">
            <div className="login">
              <h1>Routini</h1>
              {errors.length > 0 &&
                errors.map((message) => <p key={message}>{message}</p>)}
              <form onSubmit={handleSubmit}>
                <label>
                  Email or Username (case-sensitive)
                  <input
                    type="text"
                    value={email}
                    placeholder="Email or Username (case-sensitive)"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <button className="btn-login" type="submit">
                  Log In
                </button>
                <Link className="link" to="/signup">
                  Don&#39;t have a Routini account?<strong></strong> Sign up.
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
