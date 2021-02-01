import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'
import {useParams} from "react-router-dom"
export default function SinglePost() {
    const {state: {token}} = useAuth()
    axios.defaults.headers.common["Authorization"] = token;
    const [post, setPost] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const params = useParams()
    useEffect(() => {
        axios.get("http://localhost:5000/users/posts/" + params.postId).then(res => {
            console.log(res.data)
            setPost(res.data.post)
            setLoading(false)
        }).catch(e => {
            setError("post not found")
            setLoading(false)
        })
    }, [params.postId])
    return (
        loading ? (<p>loading...</p>) : (<div>
            <h1>Individual post page</h1>
            <p>{post.body}</p>
            {error && <p>{error}</p>}
        </div>)
        
    )
}
