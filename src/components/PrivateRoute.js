/* import React, { useContext } from 'react';
import { Context } from './store/appContext'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = () => {
    const { store } = useContext(Context)

    const PrivateRoute = () => {
        return (
            <Route
                render={ props => {
                    if (store.isAuth === true) {
                    <Redirect to={{ path: '/dashboard'}} />
                } else {
                    <Redirect to={{ path: '/login' }} />
                }
                }}
            />
        )
    }
} */