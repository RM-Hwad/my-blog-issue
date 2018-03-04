import Animation from './js/animation'

const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')

function start() {
    Animation(0, 200, 3000, 'easeOutBack', function (val, done) {
        box1.style.left = val + 'px'
    })

    Animation(0, 200, 3000, [0.83, -0.72, 0.38, 1.65], function (val, done) {
        box2.style.left = val + 'px'
        if (done) {
            setTimeout(() => {
                end()
            }, 500)
            setTimeout(() => {
                start()
            }, 1000)
        }
    })
    box3.style.left = '200px'
    box3.style.transitionDuration = '3000ms'
}

function end() {
    box1.style.left = '0px'
    box2.style.left = '0px'
    box3.style.left = '0px'
    box3.style.transitionDuration = '0ms'
}

start()


