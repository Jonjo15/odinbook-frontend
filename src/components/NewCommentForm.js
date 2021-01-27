import React, {useState} from 'react'
import axios from "axios"
import { useAuth } from '../context/authContext'


export default function NewCommentForm({setShowForm, setPosts, postId}) {
    const {state: {token, currentUser}} = useAuth()
    const [body, setBody] = useState("")
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.post("http://localhost:5000/users/posts/" + postId)
            console.log(res)

            setPosts(prevPosts => {
                return currentUser
                //TODO: FINISH
                
            })
            setShowForm(false)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <label htmlFor="body">Whats on your mind?</label>
                <input onChange={(e) => setBody(e.target.value)} id="body" name="body" type="text" value={body}/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
    )
}
