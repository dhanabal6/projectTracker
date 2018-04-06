import { fetchProjects, addProject, editProject, fetchProjectData } from '../routines';

const initialState = {
  data: [],
  loading: false,
  updating: false,
  popup: false,
  error: null,
};
 
export default function projectsReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case fetchProjects.TRIGGER:
      return {
        ...state,
        loading: true,
      };
    case fetchProjects.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchProjects.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchProjects.FULFILL:
      return {
        ...state,
        loading: false,
      };

    case fetchProjectData.TRIGGER:
      return {
        ...state
      };
    case fetchProjectData.SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case fetchProjectData.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchProjectData.FULFILL:
      return {
        ...state
      };

    case addProject.TRIGGER:
    case editProject.TRIGGER:
      return {
        ...state,
        updating: true,
        popup: false,
     };
    case addProject.FAILURE:
    case editProject.FAILURE:
      return {
        ...state,
         updating:false,
      };
    case addProject.SUCCESS:
    case editProject.SUCCESS:
      return {
        ...state,
        updating: false,
        popup: true,  
    };
    case addProject.FULFILL:
    case editProject.FULFILL:
      return {  
        ...state,
        popup: false,
    };
    default:
      return state;
  }
}