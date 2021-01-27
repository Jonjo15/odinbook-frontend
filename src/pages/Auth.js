import React from 'react'
import RegisterLoginForm from '../components/RegisterLoginForm'
import { useAuth } from '../context/authContext'
import {Redirect} from "react-router-dom"
export default function Auth() {
    const {state: {authenticated}} = useAuth()
    return !authenticated ? (
        <div className="container">
            <h1>Auth Page</h1>
            <RegisterLoginForm/>
        </div>
    ) : <Redirect to="/home"/>
}
