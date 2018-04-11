import { fetchTasks, addTask, editTask, updateTimelog } from '../routines';
 
const initialState = {
  data: [],
  loading: false,
  updating: false,
  popup: false,
  error: null,
};
 
export default function tasksReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case fetchTasks.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchTasks.FULFILL:
      return {
        ...state,
        loading: false,
      };

    case updateTimelog.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case updateTimelog.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case updateTimelog.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case updateTimelog.FULFILL:
      return {
        ...state,
        loading: false,
      };

    case addTask.TRIGGER:
    case editTask.TRIGGER:
      return {
        ...state,
        updating: true,
        popup: false,
      };
    case addTask.FAILURE:
    case editTask.FAILURE:
      return {
        ...state,
        updating:false,
      };
    case addTask.SUCCESS:
    case editTask.SUCCESS:
      return {
        ...state,
        updating: false,
        popup: true,
    };
    case addTask.FULFILL:
    case editTask.FULFILL:
      return {
        ...state,
        popup: false,
    };
    default:
      return state;
  }
}