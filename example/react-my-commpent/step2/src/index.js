import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Carousel from './component/carousel/carousel'


import './index.scss'
const Main = () => {
    return <div>
        <Carousel infinite dots autoplay>
            {
                [0, 1, 2, 3, 4].map(item => <div className={`carousel-item carousel-item${item}`} key={item}>{item}</div>)
            }
        </Carousel>
        <br />
        <Carousel infinite autoplay vertical>
            {
                [0, 1, 2, 3, 4].map(item => <div className={`carousel-item carousel-item${item}`} key={item}>{item}</div>)
            }
        </Carousel>
    </div>
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
