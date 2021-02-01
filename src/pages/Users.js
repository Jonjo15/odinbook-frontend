import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'
import UserPreview from '../components/UserPreview'


export default function Users() {
    const {state: {token, currentUser}} = useAuth()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const [numUsers, setNumUsers] = useState(10)
    axios.defaults.headers.common['Authorization'] = token;
    useEffect(() => {
        
        axios.get("http://localhost:5000/users/")
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
            setLoading(false)
        })
        .catch(err => {
            setError(err.message)
        })
    },[currentUser])
    //TODO:
    return (
        <div className="container">
            <h1>Users</h1>
            {loading && <h2>Loading...</h2>}
            {error && <small>{error}</small>}
            {users && users.map((u,i) => {
                if (i < numUsers) {
                    return  <UserPreview setUsers={setUsers} key={u._id} user={u}/>
                }
                else {
                    return null
                }
            })}
            {numUsers < users.length ? (<button onClick={()=> setNumUsers(prev => prev + 10)}>Show More</button>): null}
        </div>
    )
}
