import React from 'react'
import Notifications from "./Notifications"
import {Link} from "react-router-dom"
import {useAuth} from "../context/authContext"
export default function Navbar() {
    const {logout, state: {currentUser, authenticated}} = useAuth()
    const handleClick = e => {
        logout()
    }
    return (
        authenticated ? (<div>
            <h1>Allahu navbar</h1>
            {currentUser && (<h2>Welcome {currentUser.first_name}</h2>)}
            <button onClick={handleClick}>Log Out</button>
            <Notifications />
             <Link to="/home">Home</Link>
             <Link to="/profile">Profile</Link>
             <Link to="/users">Users</Link>
             
        </div>) :
        (<div>
            <h1>Allahu navbar</h1>
        </div>)
        
    )
}
