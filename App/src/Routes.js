import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Image from './Image'
import Settings from './Settings'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/image" component={Image} />
            <Route exact path="/settings" component={Settings} />
        </Switch>
    </BrowserRouter>
)

export default Routes
