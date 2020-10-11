import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'
import { db } from '../Firebase'
import { Link } from 'react-router-dom';

const Post = (props) => {
    const { actions, store } = useContext(Context)
    const [url, setUrl] = useState('')
    const [desc, setDesc] = useState('')

    const postInstagram = async (event) => {
        event.preventDefault()
        if (sessionStorage.getItem('isAuth') && sessionStorage.getItem('user')) {
            await db.collection('posts').doc().set({
                user: store.user,
                url: url,
                description: desc
            })
            props.history.push('/dashboard')
        } else if (store.user === "") {
            alert("Debes iniciar sesión para hacer un post.")
        }
    }

    return (
        <div className="topnav">
            <Link to="/dashboard" type="button" href=""><img className=" logo2" src={require('../styles/name-logo.png')} alt="instagram name logo" href="/dashboard" ></img></Link>
            <input className=" search" id='search' type="text" placeholder="Busca"></input>
            <Link to="/dashboard" type="button" href=""><i className="fas fa-home fa-lg icon" href=""></i></Link>
            <Link to="/post" type="button" href=""><i className="fas fa-camera fa-lg icon" href=""></i></Link>
            <Link to="/newAccount" type="button" href=""><i className="fas fa-user-plus fa-lg icon" href=""></i></Link>
            <Link to="/dashboard" type="button" href=""><i className="far fa-heart fa-lg icon"></i></Link>
            <Link to="/login" type="button" href=""><i className="fas fa-sign-out-alt fa-lg icon" onClick={() => actions.logout(props.history)}></i></Link>

            {/*                     <img className="lorem picsum" src= {url} alt="lorem picsum"  ></img> */}

            <div className="pic" style={{
                backgroundImage: `url(${url})`,
            }}>

            </div>

            <div className="mainParagraph">
                <h2>Postear Imagen</h2>

                <form className="" onSubmit={(event) => postInstagram(event)} >

                    <div>
                        <input className="input" value={url} id='url-in' type="text" placeholder="url" onChange={(event) => setUrl(event.target.value)}></input>
                    </div>
                    <div>
                        <input className="input" value={desc} id='password-in' type="text" placeholder="Descripción" onChange={(event) => setDesc(event.target.value)}></input>
                    </div>
                    <div>
                        <button className="button" type="submit" > Postear </button>
                    </div>

                </form>
            </div>

        </div>
    )
}


export default Post;