const ua = navigator.userAgent.toLowerCase()
const isWeChatDevTools = /wechatdevtools/.test(ua)
export const hasTouch = 'ontouchstart' in window || isWeChatDevTools

let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
        return key
        }
    }
    return false
})()
export function prefixStyle(style) {
    if (vendor === false) {
      return false
    }
  
    if (vendor === 'standard') {
      if (style === 'transitionEnd') {
        return 'transitionend'
      }
      return style
    }
  
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
let transform = prefixStyle('transform')
export const style = {
    transform,
    opacity: prefixStyle('opacity'),
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionProperty: prefixStyle('transitionProperty'),
    transitionDelay: prefixStyle('transitionDelay'),
    transformOrigin: prefixStyle('transformOrigin'),
    transitionEnd: prefixStyle('transitionEnd')
}
