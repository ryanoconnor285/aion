import {
  GET_WORK_SHIFTS,
  WORK_SHIFT_LOADING,
  CLOCK_IN,
  CLOCK_OUT
} from '../actions/types';

const initialState = {
  workShifts: [],
  workShift: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case WORK_SHIFT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WORK_SHIFTS:
      return {
        ...state,
        workShifts: action.payload,
        loading: false
      };
    case CLOCK_IN:
      return {
        ...state,
        workShifts: [action.payload, ...state.workShifts]
      };
    case CLOCK_OUT:
      return {
        ...state,
        workShift: action.payload
      };
    default:
      return state;
  }
};
