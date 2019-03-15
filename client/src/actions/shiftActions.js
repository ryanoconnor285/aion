import axios from 'axios';

import { GET_WORK_SHIFTS, WORK_SHIFT_LOADING } from './types';

// Get all of current user's shifts
export const getShifts = () => dispatch => {
  dispatch(setShiftLoading());
  axios.get('api/shift/all')
    .then(res =>
      dispatch({
        type: GET_WORK_SHIFTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_WORK_SHIFTS,
        payload: null
      })
    );
}

// Set loading state
export const setShiftLoading = () => {
  return {
    type: WORK_SHIFT_LOADING
  };
};