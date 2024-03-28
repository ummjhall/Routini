import { csrfFetch } from './csrf';

const LOAD_REWARDS = 'rewards/LOAD_REWARDS';
const CREATE_REWARD = 'rewards/CREATE_REWARD';
const UPDATE_REWARD = 'rewards/UPDATE_REWARD';
const DELETE_REWARD = 'rewards/DELETE_REWARD';

const loadRewards = (rewards) => ({
  type: LOAD_REWARDS,
  payload: rewards,
});

const createReward = (reward) => ({
  type: CREATE_REWARD,
  payload: reward,
});

const updateReward = (reward) => ({
  type: UPDATE_REWARD,
  payload: reward,
});

const deleteReward = (reward) => ({
  type: DELETE_REWARD,
  payload: reward,
});

export const getRewards = () => async (dispatch) => {
  const res = await csrfFetch('api/rewards/current');

  if (res.ok) {
    const rewards = await res.json();
    dispatch(loadRewards(rewards));
    console.log('***** rewards', rewards);
    return rewards;
  }
};

export const createUserReward =
  ({ type, title, description, cost }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/rewards/current', {
      method: 'POST',
      body: JSON.stringify({
        type,
        title,
        description,
        cost,
      }),
    });

    if (res.ok) {
      const reward = await res.json();
      dispatch(createReward(reward));
      return reward;
    } else {
      const data = await res.json();
      return data.errors;
    }
  };

export const editUserReward =
  ({ type, title, description, cost }) =>
  async (dispatch) => {
    const res = await csrfFetch('/api/rewards/current', {
      method: 'PUT',
      body: JSON.stringify({
        type,
        title,
        description,
        cost,
      }),
    });

    if (res.ok) {
      const reward = await res.json();
      dispatch(updateReward(reward));
      return reward;
    } else {
      const data = await res.json();
      return data.errors;
    }
  };

export const removeReward = () => async (dispatch) => {
  const res = await csrfFetch('/api/rewards/current', {
    method: 'DELETE',
  });

  if (res.ok) {
    return dispatch(deleteReward(res));
  } else {
    const data = await res.json();
    return data.errors;
  }
};

const initialState = {};

let updatedState;

const rewardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REWARDS:
      return {
        ...state,
        ...action.payload,
      };

    case CREATE_REWARD:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case UPDATE_REWARD:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_REWARD:
      updatedState = { ...state };
      delete updatedState[action.payload.id];
      return updatedState;

    default:
      return state;
  }
};

export default rewardsReducer;
