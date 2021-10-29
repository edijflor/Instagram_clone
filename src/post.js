import React, { useState, useEffect} from 'react';
import './post.css';
import { db } from './firebase';
import Avatar from "@material-ui/core/Avatar";


function Post({postId, username, caption, imageUrl}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {

    }

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
            
            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            <form className="post_commentbox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button 
                    className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post
