import React from 'react'
import Notifications from "./notifications/Notifications"
import {Link} from "react-router-dom"
import {useAuth} from "../context/authContext"
import Requests from './requests/Requests'
import {Menu, Button} from "semantic-ui-react"
export default function Navbar() {
    const {logout, state: {currentUser, authenticated}} = useAuth()
    const handleClick = e => {
        logout()
    }
    return (
        authenticated ? (<Menu inverted>
                            <Menu.Item
                                name='home'
                                as={Link}
                                to="/home"
                            />
                            <Menu.Item
                                name='Profile'
                                as={Link}
                                to="/profile"
                            />
                            <Menu.Item
                                name='Users'
                                as={Link}
                                to="/users"
                            />
                            <Menu.Item
                                name="Notifications"
                                as={Notifications}
                            />
                            <Menu.Item 
                                name="Friend Requests"
                                as={Requests}/>
                            <Menu.Item
                                name={"Welcome " + currentUser.first_name}
                                as={Link}
                                to="/profile"
                            />
                            <Menu.Item
                                name='Log Out'
                                as={Button}
                                onClick={handleClick}
                            />
                        </Menu>) :
        ((
            <Menu inverted>
              <Menu.Item
                name='home'
                as={Link}
                to="/home"
              />
            </Menu>
          ))
        
    )
}
// <div>
//             <h1>Allahu navbar</h1>
//             {currentUser && (<h2>Welcome {currentUser.first_name}</h2>)}
//             <button onClick={handleClick}>Log Out</button>
//             <Notifications />
//             <Requests/>
//              <Link to="/home">Home</Link>
//              <Link to="/profile">Profile</Link>
//              <Link to="/users">Users</Link>
             
//         </div>