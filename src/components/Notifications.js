import React, {useState, useEffect} from 'react'
import SingleNotification from "./SingleNotification"
import { useAuth } from '../context/authContext'
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'


export default function Notifications() {
    const {state: {token}} = useAuth()
    const [notifications, setNotifications] = useState([])
    const [error,setError] = useState(null)
    axios.defaults.headers.common['Authorization'] = token;

    useEffect(() => {
        axios.get("http://localhost:5000/notifications").then(res => {
        //TODO: NOTIFICATIONS API FIX
            setNotifications(res.data.notifications)
        }).catch(err => {
            console.error(err)
            setError(err.message)
        })
    }, [])
    return (
        <div>
            <Dropdown text='Notifications'>
                <Dropdown.Menu>
                    {notifications.map(n => <Dropdown.Item as={SingleNotification} notification={n}/>)}
                </Dropdown.Menu>
            </Dropdown>
            {/* {notifications.map(n => <a href="#" key={n._id}>{n._id}</a>)} */}
            {error && <span>{error}</span>}
        </div>
    )
}
