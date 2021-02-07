import React, {useState, useEffect} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import { useAuth } from '../context/authContext'
import {Card} from "semantic-ui-react"
import Post from "../components/post/Post"
import NoImg from "../images/no-image.png"

export default function UserProfile() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const {state: {token}} = useAuth()
    axios.defaults.headers.common["Authorization"] = token
    const [img, setImg] = useState(NoImg)
    useEffect(() => {
        axios.get("http://localhost:5000/users/" + params.userId).then(res => {
            console.log(res.data)
            setUser(res.data.user)
            if(res.data.user.profile_pic_url) {
                setImg(res.data.user.profile_pic_url)
            }
            setPosts(res.data.posts)
            setLoading(false)
        }).catch(e => {
            console.log(e.message)
            setLoading(false)
            setError("Not allowed to see this users page")
        })
    }, [params.userId])
    return (
        error ? (<p>{error}</p>) : loading ? (<p>loading...</p>) : (<div className="container">
            <Card
            // TODO: FIX THIS BUG
            image={img}
            header={user.first_name + " " + user.family_name}
            meta={user.email}
            description={user.bio ? user.bio : ""}
            />
            {posts.length === 0 ? <p>No posts yet</p> : posts.map(p => <Post key={p._id} post={p} setPosts={setPosts}/>)}
        </div>)
        
    )
}
