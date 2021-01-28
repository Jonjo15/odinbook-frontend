import {SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_USER, FINISH_LOADING, LOG_OUT, SET_ERRORS} from "./types"
import {initialState} from "./authContext"
export default function authReducer (state, action){
    switch(action.type) {
        case SET_UNAUTHENTICATED:
            return {
            ...state,
            currentUser: null,
            authenticated: false
            }
        case SET_AUTHENTICATED:
            return {
              ...state,
              authenticated: true
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case FINISH_LOADING:
            return {
                ...state,
                loading: false
            }
        case SET_USER:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user,
                token: action.payload.token,
                authenticated: true
            }
        case LOG_OUT:
            localStorage.removeItem("token")
            return {
                ...initialState, 
                loading: false
            }
        case SET_ERRORS:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
      default:
        return state;
    }
  }