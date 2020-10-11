import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'
import { db } from '../Firebase'
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    const { actions, store } = useContext(Context)
    const [posts, setPosts] = useState('')

    useEffect(() => {
        if (store.user === "") {
            props.history.push('/login')
        } else {
            actions.isAuth();
            getPosts();
        }
    }, [])

    const getPosts = async () => {
        db.collection('posts').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setPosts(docs);
            console.log(docs);
        })
    }

    const deletePost = async (event, user) => {
        if (user === store.user) {
            await db.collection("posts").doc(event).delete();
        } else {
            alert("usted no puede borrar esto mi niño");
        }
    }

    return (

        <div className="container">
            <div className="topnav">
                <Link to="/dashboard" type="button" href=""><img className=" logo2" src={require('../styles/name-logo.png')} alt="instagram name logo" href="/dashboard" ></img></Link>
                {/*  <i className="fas fa-search fa-sm sIcon"> </i> */}
                <input className=" search" id='search' type="text" placeholder="Busca"></input>
                <Link to="/dashboard" type="button" href=""><i className="fas fa-home fa-lg icon" href=""></i></Link>
                <Link to="/post" type="button" href=""><i className="fas fa-camera fa-lg icon" href=""></i></Link>
                <Link to="/newAccount" type="button" href=""><i className="fas fa-user-plus fa-lg icon" href=""></i></Link>
                <Link to="/dashboard" type="button" href=""><i className="far fa-heart fa-lg icon"></i></Link>
                <Link to="/login" type="button" href=""><i className="fas fa-sign-out-alt fa-lg icon" onClick={() => actions.logout(props.history)}></i></Link>
            </div>

            <div className="postings">

                {
                    posts.length > 0 &&
                    posts.map((post, index) => (

                        <div className="allPosts" key={index} >
                            <div className="userDash">
                                {post.user}
                                <a href="dashboard" onClick={() => deletePost(post.id, post.user)}>
                                    <i className="fas fa-ellipsis-h fa-sm dotIcon" ></i>
                                </a>
                            </div>
                            <div className="picDash" style={{
                                backgroundImage: `url(${post.url})`,
                            }}>
                            </div>
                            <div className="userDash">
                                {post.user} : {post.description}

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard;