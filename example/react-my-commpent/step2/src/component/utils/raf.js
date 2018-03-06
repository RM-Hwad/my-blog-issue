var vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = window['request' + suffix]
  , caf = window['cancel' + suffix] || window['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = window[vendors[i] + 'Request' + suffix]
  caf = window[vendors[i] + 'Cancel' + suffix]
      || window[vendors[i] + 'CancelRequest' + suffix]
}

if(!raf || !caf) {
    var last = 0
      , id = 0
      , queue = []
      , frameDuration = 1000 / 60
      raf = function(callback) {
        if(queue.length === 0) {
            var _now = new Date()
              , next = Math.max(0, frameDuration - (_now - last))
            last = next + _now  
            setTimeout(function() {
                var cp = queue.slice(0)
                queue.length = 0
                for(var i = 0; i < cp.length; i++) {
                  if(!cp[i].cancelled) {
                    try{
                      cp[i].callback(last)
                    } catch(e) {
                      setTimeout(function() { throw e }, 0)
                    }
                  }
                }
            }, Math.round(next))
        }
        queue.push({
            handle: ++id,
            callback: callback,
            cancelled: false
        })
        return id
      }

      caf = function(handle) {
        for(var i = 0; i < queue.length; i++) {
          if(queue[i].handle === handle) {
            queue[i].cancelled = true
          }
        }
      }
}

module.exports = {
    requestAnimationFrame: function(fn) {
        return raf.call(window, fn)
    },
    cancelAnimationFrame : function() {
        caf.apply(root, arguments)
    }

}