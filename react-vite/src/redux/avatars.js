import { csrfFetch } from './csrf';

const LOAD_AVATAR = 'avatars/LOAD_AVATAR';
const CREATE_AVATAR = 'avatars/CREATE_AVATAR';
const UPDATE_AVATAR = 'avatars/UPDATE_AVATAR';
const DELETE_AVATAR = 'avatars/DELETE_AVATAR';

const loadAvatar = (avatar) => ({
  type: LOAD_AVATAR,
  payload: avatar,
});

const createAvatar = (avatar) => ({
  type: CREATE_AVATAR,
  payload: avatar,
});

const updateAvatar = (avatar) => ({
  type: CREATE_AVATAR,
  payload: avatar,
});

const deleteAvatar = (avatar) => ({
  type: DELETE_AVATAR,
  payload: avatar,
});

export const getUserAvatar = () => async (dispatch) => {
  const res = await csrfFetch('api/avatars/current');

  if (res.ok) {
    const avatar = await res.json();
    dispatch(loadAvatar(avatar));
    return avatar;
  }
};

export const createUserAvatar =
  ({ name, bio }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/avatars/current', {
      method: 'POST',
      body: JSON.stringify({
        name,
        bio,
      }),
    });

    if (res.ok) {
      const avatar = await res.json();
      dispatch(createAvatar(avatar));
      return avatar;
    } else {
      const data = await res.json();
      return data.errors;
    }
  };

export const editUserAvatar =
  ({ name, bio }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/avatars/current', {
      method: 'PUT',
      body: JSON.stringify({
        name,
        bio,
      }),
    });

    if (res.ok) {
      const avatar = await res.json();
      dispatch(updateAvatar(avatar));
      return avatar;
    } else {
      const data = await res.json();
      return data.errors;
    }
  };

export const removeAvatar = () => async (dispatch) => {
  const res = await csrfFetch('/api/avatars/current', {
    method: 'DELETE',
  });

  if (res.ok) {
    return dispatch(deleteAvatar(res));
  } else {
    const data = await res.json();
    return data.errors;
  }
};

const initialState = {
  avatar: null,
};

const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };

    case CREATE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };

    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };

    case DELETE_AVATAR:
      return {
        ...state,
        avatar: null,
      };

    default:
      return state;
  }
};

export default avatarReducer;
