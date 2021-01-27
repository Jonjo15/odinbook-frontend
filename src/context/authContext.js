import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./authReducer"
import {FINISH_LOADING} from "./types"
// import axios from "axios"
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

const initialState = {
    authenticated: false,
    loading: false,
    currentUser: null, 
    token: localStorage.getItem("token"), 
    error: null
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        dispatch({type: FINISH_LOADING})
    }, [])



    const value = {
      state,
      dispatch
    }
      return (
          <AuthContext.Provider value={value}>
              {!state.loading && children}
          </AuthContext.Provider>
      )
  }