import { useEffect, useContext, useReducer, createContext} from "react"
import authReducer from "./authReducer"
import {FINISH_LOADING, LOADING_USER, LOG_OUT, SET_USER} from "./types"
import axios from "axios"
import {useHistory} from "react-router-dom"
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const initialState = {
    authenticated: false,
    loading: true,
    //TODO: PUT LOADING BACK TO TRUE
    currentUser: null, 
    token: localStorage.getItem("token"), 
    error: null
};

export function AuthProvider({children}) {
    const history = useHistory()
    const [state, dispatch] = useReducer(authReducer, initialState)
    useEffect(() => {
        dispatch({type: FINISH_LOADING})
    }, [])

    const register = async (data) => {
        dispatch({type: LOADING_USER})
        try {
            const res = await axios.post("http://localhost:5000/auth/register", data)
            console.log(res)
            dispatch({type: SET_USER, payload: res.data})
            // history.push("/home")
        } catch (error) {
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
            const res = await axios.post("http://localhost:5000/auth/facebook/token")
            dispatch({type: SET_USER, payload: res.data})
        } catch (error) {
            console.error(err)
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