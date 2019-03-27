import {
  GET_WORK_SHIFTS,
  WORK_SHIFT_LOADING,
  CLOCK_IN,
  CLOCK_OUT,
  GET_OPEN_SHIFTS,
  EDIT_SHIFT,
  DELETE_SHIFT
} from '../actions/types';

const initialState = {
  workShifts: [],
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
    case GET_OPEN_SHIFTS:
      return {
        ...state,
        openShifts: action.payload,
        loading: false
      }; 
    case EDIT_SHIFT:
      return {
        ...state,
        workShift: action.payload
      };
    case DELETE_SHIFT:
      return {
        ...state,
        workShifts: state.workShifts.filter(workShift => workShift._id !== action.payload)
      };
    case CLOCK_IN:
      return {
        ...state,
        workShifts: [action.payload, ...state.workShifts]
      };
    case CLOCK_OUT:
      return {
        ...state,
        workShifts: [action.payload, ...state.workShifts],
        openShifts: state.openShifts.filter(openShift => openShift._id !== action.payload)
      };
    default:
      return state;
  }
};
