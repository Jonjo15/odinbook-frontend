import React from 'react'
import { useAuth } from '../context/authContext'
import {Redirect} from "react-router-dom"
export default function Home() {
    const {state: {authenticated, currentUser, token}} = useAuth()
    return authenticated ? (
        <div>
            <h1>Home Page</h1>
            <p>.....{JSON.stringify(currentUser)}</p>
            <p>{JSON.stringify(token)}</p>
        </div>
    ) : <Redirect to="/"/>
}
