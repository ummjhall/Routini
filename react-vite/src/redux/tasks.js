import { csrfFetch } from './csrf';
const LOAD_TASKS = 'load/tasks';
const CREATE_TASK = 'create/task'
const UPDATE_TASK = 'update/task';

const loadTasks = (payload) => ({
  type: LOAD_TASKS,
  payload
});

export const postTask = (task) => ({
    type: CREATE_TASK,
    task
});

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    task
});

export const getTasks = () => async dispatch => {
    const response = await csrfFetch("/api/tasks/current");
    if(response.ok) {
        const data = await response.json();
        dispatch(loadTasks(data));
        return data
    }
    return response
};

export const postNewTask = (task) => async (dispatch) => {
    const resTask = await csrfFetch("/api/tasks/current",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(task)
        }
    );
    if (resTask.ok) {
        const newTask = await resTask.json();
        dispatch(postTask(newTask));
        return newTask;
    }
    return resTask
};

export const editTask = (task) => async dispatch => {
    const resTask = await csrfFetch(`/api/tasks/current/${task.id}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(task)
        }
    );
    if(resTask.ok) {
      const updatedTask = await resTask.json();
      dispatch(updateTask(updatedTask));
      console.log(updatedTask)
      return updatedTask
    }
    return resTask
  };


function taskReducer(state = {}, action) {
    const newState = {...state}
    switch (action.type) {
        case LOAD_TASKS:
            action.payload.Tasks.forEach((task) => {
                newState[task.id] = task
            })
            return newState
        case CREATE_TASK:
            newState[action.task.id] = {...newState[action.task.id], ...action.task}
            return newState
        case UPDATE_TASK:
            newState[action.task.id] = {...action.task}
            return newState;
        default:
        return state;
  }
}

export default taskReducer;
