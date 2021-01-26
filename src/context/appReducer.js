import {SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_USER, FINISH_LOADING} from "./types"

export default function appReducer (state, action){
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
            return {
                ...state,
                loading: false,
                currentUser: action.payload.user
            }
      default:
        return state;
    }
  }