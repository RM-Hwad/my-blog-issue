const cubicBezier = function (t, x1, y1, x2, y2) {
    return t * ((3 * y1 - 3 * y2 + 1) * Math.pow(t, 2) + t * (3 * y2 - 6 * y1) + 3 * y1)
}

export default cubicBezier