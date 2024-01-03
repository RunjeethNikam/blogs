import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        await axios.get('http://posts.com/posts').then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            console.log(err.message);
        });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div
                className="card p-3"
                style={{ width: '30%', marginBottom: "20px" }}
                key={post.id}
            >
                <div>
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    )
}

export default PostList;
