import { combineReducers } from 'redux';
import cart from './cart';
import login from './login';

const rootReducer = combineReducers({
  cart,
  login,
});

export default rootReducer;
