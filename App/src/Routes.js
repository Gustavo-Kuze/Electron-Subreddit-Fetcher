import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Image from './Image'
import About from './About'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/image" component={Image} />
            <Route exact path="/about" component={About} />
        </Switch>
    </BrowserRouter>
)

export default Routes
