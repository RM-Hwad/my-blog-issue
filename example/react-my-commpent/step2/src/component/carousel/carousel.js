import React from 'react'
import PropTypes from 'prop-types'
import { PrefixCls } from '../config'
import Slide from './carousel.slide'

import './index.scss'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carouselIndex: props.selectedIndex
        }
    }
    componentDidMount() {
        this.carouselInit()
    }
    componentWillUnmount(){
        this.Slide && this.Slide.destroy()
    }
    carouselInit() {
        const carouse = this.carouse
        const onChange =  (index) => {
            this.setState({
                carouselIndex: index
            })
            this.props.afterChange &&  this.props.afterChange(index)
        }
        const props = Object.assign({}, this.props, { onChange })
        this.Slide = new Slide(carouse, props)
    }
    reset(){
        this.Slide && this.Slide.destroy()
        this.carouselInit()
    }
    render() {
        const { children,dots } = this.props
        return (
            <div className={`${PrefixCls}-carousel`}>
                <div className={`${PrefixCls}-slider-frame`}>
                    <ul className="slider-list" ref={e => this.carouse = e}>
                        {
                            children && children.length > 0 && children.map((c, index) => (
                                <li key={index} className="slider-slide">
                                    {c}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {
                    dots && (
                        <div className={`${PrefixCls}-slide-dots`}>
                            {
                                children && children.length > 0 && children.map((c, index) => (
                                    <span key={`${index}`} className={`dot ${this.state.carouselIndex === index ? 'active' : ''}`}></span>
                                ))
                            }
                        </div>)
                }
            </div>
        )
    }
}

Carousel.defaultProps = {
    isClick: true,
    selectedIndex: 0,
    autoplay: false,
    infinite: false,
    vertical: false,
    dots: false,
    autoplayInterval: 3000
}
Carousel.propTypes = {
    isClick: PropTypes.bool,
    selectedIndex: PropTypes.number,
    autoplay: PropTypes.bool,
    infinite: PropTypes.bool,
    vertical: PropTypes.bool,
    dots: PropTypes.bool,
    autoplayInterval: PropTypes.number,
    afterChange: PropTypes.func
}

export default Carousel