import './css/index.styl';

_px2rem_()
window.addEventListener('resize', (e) => {
	_px2rem_()
})

function _px2rem_(){
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    let htmlDOM = document.getElementsByTagName('html')[0];
    htmlDOM.style.fontSize = htmlWidth / 10 + 'px';
}

