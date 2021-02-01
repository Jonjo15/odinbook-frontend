import React, {useState, useEffect} from 'react'
import SingleNotification from "./SingleNotification"
import { useAuth } from '../context/authContext'
import axios from "axios"
import {Link} from "react-router-dom"
import { Dropdown } from 'semantic-ui-react'


export default function Notifications() {
    const {state: {token}} = useAuth()
    const [notifications, setNotifications] = useState([])
    const [error,setError] = useState(null)
    axios.defaults.headers.common['Authorization'] = token;

    useEffect(() => {
        axios.get("http://localhost:5000/notifications").then(res => {
            setNotifications(res.data.notifications)
        }).catch(err => {
            console.error(err)
            setError(err.message)
        })
    }, [])

    const handleClick =async e => {
        console.log("Remove notificaiton")
        try {
            const res = await axios.put("http://localhost:5000/notifications/all")
            console.log(res)
            setNotifications(prev => {
                return prev.map(n => {
                    n.seen = true;
                    return n
                })
            })
        } catch (error) {
            setError("Something went wrong with marking notifications")
        }
    }

    return (
        <div>
            <Dropdown text={(notifications.filter(n => n.seen === false).length).toString()} icon="alarm">
                <Dropdown.Menu>
                    {notifications.map(n => <Dropdown.Item key={n._id} as={SingleNotification} notification={n}/>)}
                    {notifications.length === 0 && <Dropdown.Item text="You have no notifications"/>}
                    {notifications.length < 10 && notifications.length > 0 && <Dropdown.Item text="View all notifications" as={Link} to="/notifications"/>}
                    {notifications.filter(n => n.seen === false).length > 0 && <Dropdown.Item text="Mark all notifications read" onClick={handleClick} />}
                </Dropdown.Menu>
            </Dropdown>
            {/* {notifications.map(n => <a href="#" key={n._id}>{n._id}</a>)} */}
            {error && <span>{error}</span>}
        </div>
    )
}
