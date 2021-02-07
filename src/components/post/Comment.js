import React from 'react'
import dayjs from "dayjs"
import axios from "axios"
import {Link} from "react-router-dom"
import { useAuth } from '../../context/authContext'
import {Button} from "semantic-ui-react"
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default function Comment({comment, setPosts}) {
    const {state: {currentUser, token}} = useAuth()
    const handleClick = async e => {
        console.log(comment)
        try {
            axios.defaults.headers.common['Authorization'] = token;
            await axios.delete("http://localhost:5000/users/comments/" + comment._id)
            setPosts(prevPosts => {
                return prevPosts.map(p => {
                    if (p._id !== comment.post) {
                        return p
                    } 
                    else {
                        let updComments = p.comments.filter(c => c._id !== comment._id)
                        return {...p, comments: updComments}
                    }
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLike = async e =>{
        try {
            axios.defaults.headers.common['Authorization'] = token;
            const res = await axios.put("http://localhost:5000/users/comments/" + comment._id)
            setPosts(prevPosts => {
                return prevPosts.map(p => {
                    if (p._id !== comment.post) {
                        return p
                    }
                    else {
                        let newComments = p.comments.map(c => {
                            if (c._id !== comment._id) {
                                return c
                            }
                            else {
                                return {...c, likes: res.data.updatedComment.likes}
                            }
                        })
                        return {...p, comments: newComments}
                    }
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="comment-card">
            <Link to={"/users/" + comment.creator._id}><h3>{comment.creator.first_name} {comment.creator.family_name}</h3></Link>
            <p>{comment.body}</p>
            <small>{dayjs(comment.createdAt).fromNow()}</small>
            <Button
            content={comment.likes.includes(currentUser._id) ? " Unlike": "Like"}
            icon='heart'
            label={{ as: 'a', basic: true, content: comment.likes.length }}
            labelPosition='right'
            onClick={handleLike}
            />
            {/* <buton onClick={handleLike}>{comment.likes.includes(currentUser._id) ? " Unlike": "Like"}</button> */}
            {/* <span>{comment.likes.length} {comment.likes.length === 1 ? "like": "likes"}</span>t */}
            
            {currentUser._id === comment.creator._id ? (<Button icon="delete" onClick={handleClick} />): null}
        </div>
    )
}
