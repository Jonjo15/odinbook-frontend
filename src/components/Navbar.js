import React from 'react'
import {Link} from "react-router-dom"
import {useAuth} from "../context/authContext"
export default function Navbar() {
    const {logout, state: {currentUser, authenticated}} = useAuth()
    const handleClick = e => {
        logout()
    }
    return (
        <div>
            <h1>Allahu navbar</h1>
            {currentUser && (<h2>Welcome {currentUser.first_name}</h2>)}
            {authenticated && <button onClick={handleClick}>Log Out</button>}
            {authenticated && <Link to="/home">Home</Link>}
            {authenticated && <Link to="/profile">Profile</Link>}
            {authenticated && <Link to="/users">Users</Link>}
        </div>
    )
}
