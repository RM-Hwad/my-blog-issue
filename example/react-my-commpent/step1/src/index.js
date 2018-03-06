import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.scss'
const Main = () => {
    return <div className="main-wrapper"></div>
}

ReactDOM.render(
    (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/' component={Main}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
    , document.getElementById('root')
);
