import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext'
import { db } from '../Firebase'
import { Link } from 'react-router-dom';

const Login = props => {
    const { actions } = useContext(Context)
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [infos, setInfos] = useState([])

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

    const checkPass = (event) => {
        event.preventDefault();
        const filterUser = infos.filter(info =>
            info.password === pass && info.name === name
        )
        if (filterUser.length > 0) {
            actions.login(props.history, name)
        } else {
            alert("Usuario y contraseña deben estar correctos")
        }
    }

    return (


        <div className="container">

            <img className="instagram phone" src={"https://upbeatagency.com/wp-content/uploads/2018/07/Screen-Shot-2018-07-19-at-10.31.07.png"} alt="instagram name logo" ></img>


            <div className="mainParagraph">

                <img className="instagram logo" src={require('../styles/name-logo.png')} alt="instagram name logo" ></img>

                <form className="mainForm" onSubmit={(event) => checkPass(event)} >

                    <div>
                        <input className="input" value={name} id='user-in' type="text" placeholder="Usuario o correo electrónico" onChange={(event) => setName(event.target.value)}></input>
                    </div>
                    <div>
                        <input className="input" value={pass} id='password-in' type="password" placeholder="Contraseña" onChange={(event) => setPass(event.target.value)}></input>
                    </div>
                    <div>
                        <button className="button" type="submit" > Iniciar sesión</button>
                    </div>

                </form>
                <hr className="line"></hr>
                <div>

                    <Link to="/sorry" type="button" href=""> ¿Has olvidado la contraseña?</Link>
                </div>

            </div>



            <div className="second">
                ¿No tienes una cuenta?&nbsp;
                <Link to="/newAccount" type="button" href="">Regístrate</Link>

            </div>


        </div>

    )
}

export default Login;