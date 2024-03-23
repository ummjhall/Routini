import { useDispatch, useSelector } from 'react-redux';
import './CreateAvatar.css';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { createUserAvatar } from '../../redux/avatars';

function CreateAvatarModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      createUserAvatar({
        name,
        bio,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <div className="border">
        <div className="container">
          <div className="avatar">
            <h3>Welcome to</h3>
            <h1>Routini</h1>
            <p>
              Greetings, traveler! Welcome to our realm. It appears that
              you&#39;re new to these lands, and it&#39;s time for you to forge
              your avatar. But before we embark on this journey, let us first
              determine the name of your avatar.
            </p>
            <p>
              Below, you&#39;ll see a display name and a biography. Once
              you&#39;ve chosen a name that resonates with you, feel free to
              craft your character&#39;s biography right here and now. The
              choice is yours!
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <p>{errors.name}</p>}
              <textarea
                type="text"
                value={bio}
                placeholder="Biography"
                onChange={(e) => setBio(e.target.value)}
                cols="30"
                rows="5"
              ></textarea>
              {errors.bio && <p>{errors.bio}</p>}
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

export default CreateAvatarModal;
