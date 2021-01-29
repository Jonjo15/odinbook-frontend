import React from 'react'
import {Feed} from "semantic-ui-react"
export default function SingleNotification({notification}) {
    return (
        <Feed>
            <Feed.Event
            //TODO: FINISH
            //TODO: UPDATE NOTIFICAITON ROUTE TO POPULATE CREATOR
            content={notification.type === "comment"}
            />
        </Feed>
    )
}
