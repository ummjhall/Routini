import { csrfFetch } from './csrf';

const LOAD_REWARDS = 'load/rewards';
const CREATE_REWARD = 'create/reward';
const UPDATE_REWARD = 'update/reward';
const DELETE_REWARD = 'delete/reward';

const loadRewards = (payload) => ({
  type: LOAD_REWARDS,
  payload,
});

export const createReward = (reward) => ({
  type: CREATE_REWARD,
  reward,
});

export const updateReward = (reward) => ({
  type: UPDATE_REWARD,
  reward,
});

export const deleteReward = (rewardId) => ({
  type: DELETE_REWARD,
  rewardId,
});

export const getRewards = () => async (dispatch) => {
  const response = await csrfFetch('/api/rewards/current');
  if (response.ok) {
    const data = await response.json();
    dispatch(loadRewards(data));
    return data;
  }
  return response;
};

export const createNewReward = (reward) => async (dispatch) => {
  const resReward = await csrfFetch('/api/rewards/current', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(reward),
  });

  if (resReward.ok) {
    const newReward = await resReward.json();
    dispatch(createReward(newReward));
    return newReward;
  }
  return resReward;
};

export const editReward = (reward) => async (dispatch) => {
  const resReward = await csrfFetch(`/api/rewards/current/${reward.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(reward),
  });

  if (resReward.ok) {
    const updatedReward = await resReward.json();
    dispatch(updateReward(updatedReward));
    return updatedReward;
  }
  return resReward;
};

export const removeReward = (rewardId) => async (dispatch) => {
  const res = await csrfFetch(`/api/rewards/current/${rewardId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });

  await dispatch(deleteReward(rewardId));
  if (res.ok) {
    return res.json();
  } else {
    return res;
  }
};

function rewardsReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_REWARDS:
      action.payload.Rewards.forEach((reward) => {
        newState[reward.id] = reward;
      });
      return newState;
    case CREATE_REWARD:
      newState[action.reward.id] = {
        ...newState[action.reward.id],
        ...action.reward,
      };
      return newState;
    case UPDATE_REWARD:
      newState[action.reward.id] = {
        ...newState[action.reward.id],
        ...action.reward,
      };
      return newState;
    case DELETE_REWARD:
      delete newState[action.rewardId];
      return newState;
    default:
      return state;
  }
}

export default rewardsReducer;
