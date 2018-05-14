import { addTimesheet, editTimesheet, fetchTimesheets } from "../routines";

const initialState = {
  data: [],
  loading: false,
  updating: false,
  popup: false,
  error: null
};

export default function timesheetsReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case fetchTimesheets.TRIGGER:
      return {
        ...state,
        updating: true
      };
    case fetchTimesheets.SUCCESS:
      return {
        ...state,
        data: action.payload,
        updating: false
      };
    case fetchTimesheets.FAILURE:
      return {
        ...state,
        error: action.payload,
        updating: false
      };
    case fetchTimesheets.FULFILL:
      return {
        ...state
      };

    case addTimesheet.TRIGGER:
    case editTimesheet.TRIGGER:
      return {
        ...state,
        updating: true,
        popup: false
      };
    case addTimesheet.FAILURE:
    case editTimesheet.FAILURE:
      return {
        ...state,
        updating: false
      };
    case addTimesheet.SUCCESS:
    case editTimesheet.SUCCESS:
      return {
        ...state,
        updating: false,
        popup: true
      };
    case addTimesheet.FULFILL:
    case editTimesheet.FULFILL:
      return {
        ...state,
        popup: false
      };
    default:
      return state;
  }
}
