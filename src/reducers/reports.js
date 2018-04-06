import { fetchReports } from '../routines';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
 
export default function reportsReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case fetchReports.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchReports.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchReports.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchReports.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}