import axios from 'axios';

import { 
  GET_WORK_SHIFTS, 
  WORK_SHIFT_LOADING, 
  CLOCK_IN, CLOCK_OUT, 
  GET_ERRORS, 
  CLEAR_ERRORS, 
  GET_OPEN_SHIFTS,
  EDIT_SHIFT
} from './types';

// Clock In
export const clockIn = newWorkShift => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/shift/clockIn', newWorkShift)
    .then(res =>
      dispatch({
        type: CLOCK_IN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clock Out
export const clockOut = clockOutData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`api/shift/clockOut/${clockOutData.id}`, clockOutData)
    .then(res =>
      dispatch({
        type: CLOCK_OUT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get recent of current user's shifts
export const getShifts = () => dispatch => {
  dispatch(setShiftLoading());
  axios.get('api/shift/recent')
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

// Get any open shifts where clockOut is null
export const getOpenShifts = () => dispatch => {
  dispatch(setShiftLoading());
  axios.get('api/shift/findOpen')
    .then(res =>
      dispatch({
        type: GET_OPEN_SHIFTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_OPEN_SHIFTS,
        payload: null
      })
    );
}

// Edit Shift
export const editShift = editShiftData => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`api/shift/edit/${editShiftData.id}`, editShiftData)
    .then(res =>
      dispatch({
        type: EDIT_SHIFT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setShiftLoading = () => {
  return {
    type: WORK_SHIFT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};