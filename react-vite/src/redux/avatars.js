import { csrfFetch } from './csrf';

const CREATE_AVATAR = 'avatars/CREATE_AVATAR';

const createAvatar = (avatar) => ({
  type: CREATE_AVATAR,
  payload: avatar,
});

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

const initialState = {};

const avatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AVATAR:
      return {
        ...state,
        newAvatars: {
          [action.payload.id]: action.payload,
        },
      };
  }
};

export default avatarReducer;
