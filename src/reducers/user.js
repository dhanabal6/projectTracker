import { register, login, userInfo, forgotPassword, resetPassword, logout, fetchUser } from '../routines';

const initialState = {
  data: {},
  userData:[],
  loading: false,
  loginState: false,
  error: null,
};
 
export default function registerReducer(state = initialState, action) {
  console.log("action.type reducer:" + action.type);
  switch (action.type) {
    case register.TRIGGER:
      return {
        ...state,
     };
    case register.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case register.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case register.FULFILL:
      return {  
        ...state,
    };

    case login.TRIGGER:
      return {
        ...state,
        loading: true,
        loginState:false,
     };
    case login.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case login.SUCCESS:
      return {
        ...state,
        data: action.payload,
        loginState: true,
    };
    case login.FULFILL:
      return {  
        ...state,
        loginState: true,
        loading: false,
    };

     case forgotPassword.TRIGGER:
      return {
        ...state,
     };
    case forgotPassword.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case forgotPassword.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case forgotPassword.FULFILL:
      return {  
        ...state,
    };

    case resetPassword.TRIGGER:
      return {
        ...state,
     };
    case resetPassword.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case resetPassword.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case resetPassword.FULFILL:
      return {  
        ...state,
    };
    
    case userInfo.TRIGGER:
      return {
        ...state,
     };
    case userInfo.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case userInfo.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case userInfo.FULFILL:
      return {  
        ...state,
    };

  case fetchUser.TRIGGER:
      return {
        ...state,
     };
    case fetchUser.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case fetchUser.SUCCESS:
      return {
        ...state,
        userData: action.payload,
    };
    case fetchUser.FULFILL:
      return {  
        ...state,
    };

    case logout.TRIGGER:
      return {
        ...state,
     };
    case logout.FAILURE:
      return {
        ...state,
         error: action.payload,
      };
    case logout.SUCCESS:
      return {
        ...state,
        data: action.payload,
    };
    case logout.FULFILL:
      return {  
        ...state,
    };

    default:
      return state;
  }
}