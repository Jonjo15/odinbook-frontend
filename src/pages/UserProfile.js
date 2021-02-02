import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import { useAuth } from '../context/authContext'
import {Card} from "semantic-ui-react"
import Post from "../components/Post"

export default function UserProfile() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const {state: {token, currentUser}} = useAuth()
    axios.defaults.headers.common["Authorization"] = token

    useEffect(() => {
        axios.get("http://localhost:5000/users/" + params.userId).then(res => {
            console.log(res.data)
            setUser(res.data.user)
            setPosts(res.data.posts)
        }).catch(e => {
            console.log(e.message)
            setError("Not allowed to see this users page")
        })
    }, [params.userId])
    return (
        error ? (<p>{error}</p>) : (<div className="grid">
            <Card
            // TODO: FIX THIS BUG
            image={user.profile_pic_url ? user.profile_pic_url : null}
            header={user.first_name + " " + user.family_name}
            meta={user.email}
            description={user.bio ? user.bio : ""}
            />
            {posts.map(p => <Post key={p._id} post={p} setPosts={setPosts}/>)}
        </div>)
        
    )
}
