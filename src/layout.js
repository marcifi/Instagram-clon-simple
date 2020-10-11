import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import New from './views/New'
import NotFound from './views/Notfound'
import Soul from './views/Soul'
import Sorry from './views/Sorry'
import Post from './views/Post'
import injectContext from './store/appContext'

const Layout = props => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/newAccount" component={New} />
                <Route exact path="/soul" component={Soul} />
                <Route exact path="/sorry" component={Sorry} />
                <Route exact path="/post" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default injectContext(Layout);