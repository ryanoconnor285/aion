import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import workShiftReducer from './workShiftReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  workShift: workShiftReducer
});