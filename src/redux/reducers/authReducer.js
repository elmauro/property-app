const initialState = {
    token: sessionStorage.getItem('jwt') || null,  // Get the token from session storage if it exists
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          token: action.payload,  // Save the token to state
        };
      default:
        return state;
    }
  }
  