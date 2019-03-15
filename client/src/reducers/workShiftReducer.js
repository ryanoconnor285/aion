import {
  GET_WORK_SHIFTS,
  WORK_SHIFT_LOADING
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
    default:
      return state;
  }
}
