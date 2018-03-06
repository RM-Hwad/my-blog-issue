import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Main = () => {
    return <div className="qwe">123456</div>
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
