import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'
import { db } from '../Firebase'
import { Link } from 'react-router-dom';

const New = props => {
    const { actions } = useContext(Context)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [infos, setInfos] = useState('')

    useEffect(() => {
        getInfos()
    }, [])

    const getInfos = async () => {
        db.collection('users').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setInfos(docs)
            console.log(docs)
        })
    }

    const postUser = async (event) => {
        event.preventDefault();
        const filterUser = infos.filter(info =>
            info.name === name
        )
        if (filterUser.length > 0) {
            alert("Usuario ya existente, elija otro nombre de usuario")
        } else {
            await db.collection('users').doc().set({
                name: name,
                username: username,
                password: pass
            })
            actions.login(props.history)
        }
    }

    /* 

 





}
    if () {
        console.log("okidoki")
    } else {
        console.log("nara")
    }
    
 
*/

    return (
        <div className="container">
            <form className="main form" onSubmit={(event) => postUser(event)} >

                <img className="instagram name logo" src={require('../styles/name-logo.png')} alt="instagram name logo" ></img>
                <div>
                    Regístrate para ver fotos y vídeos de tus amigos.
                </div>
                <div>
                    <input className="input name" value={name} id='name-in' type="text" placeholder="Nombre completo" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>
                    <input className="input user" value={username} id='user-in' type="text" placeholder="Nombre de usuario" onChange={(event) => setUsername(event.target.value)}></input>
                </div>
                <div>
                    <input className="input password" value={pass} id='password-in' type="password" placeholder="Contraseña" onChange={(event) => setPass(event.target.value)}></input>
                </div>
                <div>
                    <button className="button" type="submit" > Regístrate</button>
                </div>


            </form>
            <div>
                Al registrarte, aceptas nuestras&nbsp;&nbsp;
                <Link to="/soul" type="button" href="">Condiciones, la Política de datos y la Política de cookies. </Link>
            </div>
            <div>
                ¿Tienes una cuenta?&nbsp;&nbsp;
                <Link to="/login" type="button" href="">Entrar </Link>
            </div>
        </div>
    )
}


export default New