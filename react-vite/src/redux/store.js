import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import equipmentReducer from './equipment';
import shopReducer from './shop';
import avatarReducer from './avatars';
import taskReducer from './tasks';
import rewardsReducer from './rewards';

const appReducer = combineReducers({
  session: sessionReducer,
  tasks: taskReducer,
  equipment: equipmentReducer,
  shop: shopReducer,
  avatar: avatarReducer,
  rewards: rewardsReducer,
});

const rootReducer = (state, action) => {
  if (action.type == 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
