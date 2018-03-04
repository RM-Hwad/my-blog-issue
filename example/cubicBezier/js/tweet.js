const Tween = {
    /*
     t:当前步数
     b:初始位置
     c:总距离(变化量)
     d:总步数
    */
    linear: function (t, b, c, d) { 
        return c * t / d + b; 
    },
    easeOutQuintic: function(t,b,c,d){
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeOutBack: function (t, b, c, d, s) {
        if (s === undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
}

export default Tween