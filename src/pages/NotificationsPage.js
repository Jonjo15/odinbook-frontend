import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'
import SingleNotification from "../components/SingleNotification"
export default function NotificationsPage() {
    const {state: {token}} = useAuth()
    const [loading, setLoading] = useState(true)
    const [notifications, setNotifications] = useState([])
    const [increment, setIncrement] = useState(15)
    const [error, setError] = useState("")
    axios.defaults.headers.common["Authorization"] = token;

    useEffect(() => {
        axios.get("http://localhost:5000/notifications/all").then(res => {
            setNotifications(res.data.notifications)
            setLoading(false)
        }).catch(err => {
            setError("Something went wrong with accessing notifications")
            setLoading(false)
        })
    }, [])
    return (
        loading ? (<h1>Loading...</h1>) : (<div>
            <h1>Your Notifications</h1>
            {error && <p>{error}</p>}
            {notifications.length === 0 ? (<p>You have no notifications yet</p>): (notifications.map(n => <SingleNotification key={n._id} notification={n}/>))}
            {increment < notifications.length ? (<button onClick={() => setIncrement(c => c + 10)}>See more</button>) : null}
        </div>)
        
    )
}
