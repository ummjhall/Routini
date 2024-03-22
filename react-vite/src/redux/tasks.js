import { csrfFetch } from './csrf';
const LOAD_TASKS = 'load/tasks';


const loadTasks = (payload) => ({
  type: LOAD_TASKS,
  payload
});

export const getTasks = () => async dispatch => {
  const response = await csrfFetch("/api/tasks/current", {
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




function taskReducer(state = {tasks: null}, action) {
  switch (action.type) {
    case LOAD_TASKS:
        console.log(action.payload)
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}

export default taskReducer;
