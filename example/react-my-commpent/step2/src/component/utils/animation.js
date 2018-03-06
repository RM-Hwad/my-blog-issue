import { requestAnimationFrame } from '../util'
import Tween from './tweet'

const noCallback = function () { }
const isFunction = function (obj) {
    return typeof obj === 'function';
};
const isNumber = function (obj) {
    return typeof obj === 'number';
};
const isString = function (obj) {
    return typeof obj === 'string';
};
const toMillisecond = function (obj) {
    if (isNumber(obj)) {
        return obj;
    } else if (isString(obj)) {
        if (/\d+m?s$/.test(obj)) {
            if (/ms/.test(obj)) {
                return 1 * obj.replace('ms', '');
            }
            return 1000 * obj.replace('s', '');
        } else if (/^\d+$/.test(obj)) {
            return +obj;
        }
    }
    return 300;
};

const Animation = function (from, to, duration = '300ms', easing = 'linear', callback = noCallback) {
    if (!isNumber(from) || !isNumber(to)) {
        window.console && console.error('from和to两个参数必须且为数值');
        return 0;
    }
    if (isFunction(Tween[easing]) === false) {
        window.console && console.error('没有找到名为"' + easing + '"的动画算法');
        return;
    }

    duration = toMillisecond(duration);
    let start = 0,
        fnGetValue = Tween[easing],
        during = Math.ceil(duration / 17);

    const step = function () {
        let value = fnGetValue(start, from, to - from, during); // 当前的运动位置
        start++; // 时间递增
        if (start <= during) { // 如果还没有运动到位，继续
            callback(value);
            requestAnimationFrame(step);
        } else { // 动画结束，这里可以插入回调...
            callback(to, true);
        }
    };
    step();
}
export default Animation

