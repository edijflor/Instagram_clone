import React from 'react'
import './post.css';
import Avatar from "@material-ui/core/Avatar"

function post({username, caption, imageUrl}) {
    return (
        <div className="post">

            {/*Headeer->avatar +username*/}
            <div className="post_header">
                <Avatar
                    className="post_Avatar"
                    alt='Edison'
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            {/*Image*/}
            <img className="post_image" src={imageUrl}/>

            {/*Username+caption*/}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default post
