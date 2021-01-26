import React from 'react'
import {Route, Redirect} from "react-router-dom"
export default function PrivateRoute({ component: Component, ...rest }) {
    const currentUser = localStorage.getItem("token")
    //TODO: GET USER FROM AUTH PROVIDDER
    return (
        <Route
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/" />
        }}
    ></Route>
    )
}