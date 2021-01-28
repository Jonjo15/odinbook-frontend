import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./authReducer"
import {FINISH_LOADING, LOADING_USER, LOG_OUT, SET_ERRORS, SET_USER} from "./types"
import axios from "axios"
// import {useHistory} from "react-router-dom"
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const initialState = {
    authenticated: false,
    loading: true,
    currentUser: null, 
    token: localStorage.getItem("token"), 
    error: null
};

export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        if (!state.token) {
            dispatch({type: FINISH_LOADING})
            return;
        };
        //TODO: TEST THIS OUT A BIT
        axios.defaults.headers.common['Authorization'] = state.token;
        axios.get("http://localhost:5000/users/me").then(res => {
            console.log(res.data)
            dispatch({type: SET_USER, payload: res.data})
        }).catch(err => {
            dispatch({type: SET_ERRORS, payload: err})
            dispatch({type:FINISH_LOADING})
        })
    }, [state.token])

    const register = async (data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/register", data)
            console.log(res)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: error})
            console.error(error)
        }
    }
    const login = async (data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/login", data)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        }
        catch(err) {
            dispatch({type: SET_ERRORS, payload: err})
            console.error(err)
        }
    }
    const logout = () => {
        dispatch({type: LOG_OUT})
    }
    const fbSignIn = async(data) => {
        dispatch({type: LOADING_USER})
        try {
            //TODO: FINISH AND TEST IT OUT
            const res = await axios.post("http://localhost:5000/auth/facebook/token", data)
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            dispatch({type: SET_ERRORS, payload: error})
            console.error(error)
        }
    }
    const value = {
      state,
      dispatch, 
      register, 
      login,
      logout, 
      fbSignIn
    }
      return (
          <AuthContext.Provider value={value}>
              {!state.loading && children}
          </AuthContext.Provider>
      )
  }