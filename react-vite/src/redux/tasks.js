import { csrfFetch } from './csrf';
const LOAD_TASKS = 'load/tasks';


const loadTasks = (payload) => ({
  type: LOAD_TASKS,
  payload
});

export const getTasks = () => async dispatch => {
  const response = await fetch("/api/tasks/current", {
    method: "GET",
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(loadTasks(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  // await fetch("/api/auth/logout");
  // dispatch(removeUser());
  const response = await csrfFetch('/api/auth/logout', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


function taskReducer(state = {dailies: null, habits: null, todo: null}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default taskReducer;
