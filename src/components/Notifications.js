import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/authContext'
import axios from "axios"


export default function Notifications() {
    const {state: {token}} = useAuth()
    const [notifications, setNotifications] = useState([])
    const [error,setError] = useState(null)
    axios.defaults.headers.common['Authorization'] = token;

    useEffect(() => {
        axios.get("http://localhost:5000/notifications").then(res => {
        //TODO: NOTIFICATIONS API FIX
        }).catch(err => {
            console.error(err)
            setError(err.message)
        })
    }, [])
    return (
        <div>
            
        </div>
    )
}
