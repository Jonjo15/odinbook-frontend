import React from 'react'
import {useAuth} from "../context/authContext"
export default function Navbar() {
    const {state: {currentUser}} = useAuth()
    return (
        <div>
            <h1>Allahu navbar</h1>
            {currentUser && (<h2>Welcome {currentUser.first_name}</h2>)}
        </div>
    )
}
