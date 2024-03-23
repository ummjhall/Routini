import { csrfFetch } from './csrf';

const LOAD_AVATAR = 'avatars/LOAD_AVATAR';
const CREATE_AVATAR = 'avatars/CREATE_AVATAR';

const loadAvatar = (avatar) => ({
  type: LOAD_AVATAR,
  payload: avatar,
});

const createAvatar = (avatar) => ({
  type: CREATE_AVATAR,
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
  ({
    user_id,
    name,
    bio,
    level,
    health,
    exp,
    gold,
    gems,
    equip_head_id,
    equip_main_id,
    equip_armor_id,
  }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/avatars/current', {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        name,
        bio,
        level,
        health,
        exp,
        gold,
        gems,
        equip_head_id,
        equip_main_id,
        equip_armor_id,
      }),
    });

    if (res.ok) {
      const avatar = await res.json();
      dispatch(createAvatar(avatar));
      return avatar;
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
    default:
      return state;
  }
};

export default avatarReducer;
