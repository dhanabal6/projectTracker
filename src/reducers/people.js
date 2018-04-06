import { fetchPeople } from '../routines';
 
const initialState = {
  data: [],
  loading: false,
  error: null,
};
 
export default function peopleReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case fetchPeople.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchPeople.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchPeople.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchPeople.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}