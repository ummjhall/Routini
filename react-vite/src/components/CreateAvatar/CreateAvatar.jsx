import { useDispatch } from 'react-redux';
import './CreateAvatar.css';
import { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { createUserAvatar } from '../../redux/avatars';

function CreateAvatar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = '* Name is required';

    setErrors(newErrors);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const res = await dispatch(
      createUserAvatar({
        name,
        bio,
      })
    );

    if (res) {
      setFormSubmitted(false);
      closeModal();
    } else {
      setErrors(res);
    }
  };

  return (
    <>
      <div className="border">
        <div className="container">
          <div className="avatar">
            <h3>Welcome to</h3>
            <h1>Routini</h1>
            <div className="desktop-text">
              <p>
                Greetings, traveler! It appears that you&#39;re new to these
                lands, and it&#39;s time for you to forge your avatar. But
                before we embark on this journey, let us first determine the
                name of your avatar.
              </p>
              <p>
                Below, you&#39;ll see a display name and a biography. Once
                you&#39;ve chosen a name that resonates with you, feel free to
                craft your character&#39;s biography right here and now. The
                choice is yours!
              </p>
            </div>
            <div className="mobile-text">
              <p>
                As a newcomer, it&#39;s time to forge your avatar. Before our
                journey begins, choose your avatar&#39;s name. Once chosen,
                craft your character&#39;s biography. The choice is yours!
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {formSubmitted && errors.name ? (
                <input
                  type="text"
                  value={name}
                  className={errors.name ? 'error' : ''}
                  placeholder={errors.name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <textarea
                type="text"
                value={bio}
                placeholder="Biography"
                onChange={(e) => setBio(e.target.value)}
                cols="30"
                rows="4"
              ></textarea>
              <button className="btn-start" type="submit">
                Get Started
              </button>
              {/* <small>
                Brave soul! When naming your character, respect our Terms of
                Service and Community Guidelines. Only names that honor these
                rules are allowed.
              </small> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAvatar;
