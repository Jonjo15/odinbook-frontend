import React from 'react'
import {Feed} from "semantic-ui-react"
import {Link} from "react-router-dom"
export default function SingleNotification({notification}) {
    let likeContent;
    let route;
    if (notification.commentId) {
        route = "/posts/" + notification.commentId.post
    }
    else if (notification.type === "accept") {
        route = "/users/" + notification.sender._id
    }
    else {
        route = "/posts/" + notification.postId
    }
    if (notification.postId) {
        likeContent = "post"
    }
    else {
        likeContent = "comment"
    }
    const content = notification.type === "comment"
     ?
      (notification.sender.first_name + " commented on your post") 
      : 
      notification.type ==="accept" ? 
      (notification.sender.first_name + " accepted your request") : (notification.sender.first_name+" liked your " +likeContent)
    return (
        <Feed>
            <Feed.Event as={Link} to={route}
            //TODO: FINISH
            //TODO: UPDATE NOTIFICAITON ROUTE TO POPULATE CREATOR
            content={JSON.stringify(notification)}
            />
        </Feed>
    )
}
