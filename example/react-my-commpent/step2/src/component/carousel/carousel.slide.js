import { hasTouch, style, requestAnimationFrame } from '../util'

class Slide {
    constructor(element, option) {
        Object.assign(this, { ...option })
        this.element = element
        this.init()
    }
    init() {
        const lis = this.element.children
        if (lis.length > 0) {
            this.refresh()
            this.handleBind()
        }
    }
    handleBind() {
        let element = this.element
        this.handleEvent = function (event) {
            switch (event.type) {
                case 'touchstart':
                case 'mousedown':
                    this._start(event)
                    break;
                case 'touchmove':
                case 'mousemove':
                    this._move(event)
                    break;
                case 'touchend':
                case 'mouseup':
                case 'touchcancel':
                case 'mousecancel':
                    this._end(event)
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    this._transitionEnd(event)
                    break
                case 'resize':
                    this.autoSlideTime && clearTimeout(this.autoSlideTime)
                    this.refresh()
                    break
                default:
                    break;
            }
        };
        if (hasTouch && this.isClick) {
            element.addEventListener('touchstart', this, false);
            element.addEventListener('touchmove', this, false);
            element.addEventListener('touchend', this, false);
            element.addEventListener('touchcancel', this, false);
        } else if (!hasTouch && this.isClick) {
            element.addEventListener('mousedown', this, false);
            element.addEventListener('mousemove', this, false);
            element.addEventListener('mouseup', this, false);
            element.addEventListener('mousecancel', this, false);
        }
        element.addEventListener('transitionend', this, false);
        window.addEventListener('resize', this)
    }
    refresh() {
        const { element, selectedIndex, vertical } = this,
            lis = element.children,
            width = element.parentElement.clientWidth
        this._width = width
        this._height = lis[0].clientHeight
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i]
            li.style.width = `${width}px`
            if (vertical) {
                li.style.top = `${i * this._height}px`
                li.style.left = '0px'
            } else {
                li.style.top = '0px'
                li.style.left = `${i * width}px`
            }
        }
        element.style.width = `${width * lis.length}px`
        element.style.height = `${this._height}px`
        if (vertical) {
            this.x = 0
            this.y = selectedIndex * width * -1
        } else {
            this.x = selectedIndex * width * -1
            this.y = 0
        }
        this._index = selectedIndex
        this.isInfiniteChange = false
        this._translate(this.x, this.y)
        this._transitionTime()
        this.autoSlideTime && clearTimeout(this.autoSlideTime)
        this.autoSlide()
    }
    _start(e) {
        e.preventDefault()
        this.autoSlideTime && clearTimeout(this.autoSlideTime)
        let point = e.touches ? e.touches[0] : e
        if (this.vertical) {
            this.pointDirection = point.pageY
            this.startDirection = this.y
        } else {
            this.pointDirection = point.pageX
            this.startDirection = this.x
        }
        this.enabled = true
        this.direction = 0
        this.absDirection = 0
    }
    _move(e) {
        e.preventDefault()
        if (this.enabled !== true) return
        let point = e.touches ? e.touches[0] : e,
            pointDirection = this.vertical ? point.pageY : point.pageX
        this.direction = pointDirection - this.pointDirection
        this.absDirection = Math.abs(this.direction)
        if (this.vertical) {
            this.y = this.direction + this.startDirection
        } else {
            this.x = this.direction + this.startDirection
        }
        this.infinite && this._infiniteTo()
        this._translate(this.x, this.y)
        this._transitionTime()
    }
    _end(e) {
        if (this.absDirection > this._width * 0.1) {
            if (this.direction > 0) {
                this.selectedIndex -= 1
                this._index -= 1
            } else {
                this.selectedIndex += 1
                this._index += 1
            }
        }
        this._scrollTo()
        this._translate(this.x, this.y)
        this._transitionTime(400)
        this.autoSlide()
        this.enabled = false
    }
    _infiniteTo() {
        const { _width, _height, element, vertical } = this,
            lis = element.children,
            lisLength = lis.length
        if (lisLength >= 2) {
            let index = this.selectedIndex,
                lisInex = this._index
            if (this.direction > 0) {
                index -= 1
                lisInex -= 1
            } else {
                index += 1
                lisInex += 1
            }
            if (lisInex <= -1) {
                lisInex = lisLength - 1
            } else if (lisInex >= lisLength) {
                lisInex = 0
            }
            if (vertical) {
                requestAnimationFrame(() => {
                    lis[lisInex].style.top = `${index * _height}px`
                })
            } else {
                requestAnimationFrame(() => {
                    lis[lisInex].style.left = `${index * _width}px`
                })
            }
            this.isInfiniteChange = true
        }
    }
    _infiniteEnd() {
        const { element, _width, _height, vertical } = this,
            lis = element.children
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i]
            if (vertical) {
                li.style.top = `${i * _height}px`
            } else {
                li.style.left = `${i * _width}px`
            }
        }
        if (vertical) {
            this.y = this._index * _height * -1
        } else {
            this.x = this._index * _width * -1
        }
        this.selectedIndex = this._index
        this._translate(this.x, this.y)
        this.isInfiniteChange = false
    }
    _scrollTo() {
        const lis = this.element.children,
            lisLength = lis.length
        if (this.infinite) {
            if (this._index <= -1) {
                this._index = lisLength - 1
            } else if (this._index >= lisLength) {
                this._index = 0
            }
        } else {
            if (this.selectedIndex < 0) {
                this.selectedIndex = 0
            } else if (this.selectedIndex > lisLength - 1) {
                this.selectedIndex = lisLength - 1
            }
        }
        if (this.vertical) {
            this.y = this.selectedIndex * this._height * -1
        } else {
            this.x = this.selectedIndex * this._width * -1
        }
        this.onChange && this.onChange(this._index)
    }
    _translate(x, y) {
        this.element.style[style.transform] = `translate3d(${x}px, ${y}px, 0px) translateZ(0)`
    }
    _transitionTime(time = 0) {
        this.element.style[style.transitionDuration] = time + 'ms'
        this.element.style[style.transitionTimingFunction] = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    }
    _transitionEnd() {
        if (this.isInfiniteChange) {
            this._infiniteEnd()
        }
        this._transitionTime()
    }
    autoSlide() {
        if (!this.autoplay) return
        this.autoSlideTime = setTimeout(() => {
            this.direction = -1
            this.infinite && this._infiniteTo()
            this.selectedIndex += 1
            this._index += 1
            this._scrollTo()
            this._translate(this.x, this.y)
            this._transitionTime(400)
            this.autoSlide()
        }, this.autoplayInterval)
    }
    destroy() {
        let element = this.element
        this.autoSlideTime && clearTimeout(this.autoSlideTime)
        element.removeEventListener('touchstart', this, false);
        element.removeEventListener('touchmove', this, false);
        element.removeEventListener('touchend', this, false);
        element.removeEventListener('touchcancel', this, false);
    }
}

export default Slide
