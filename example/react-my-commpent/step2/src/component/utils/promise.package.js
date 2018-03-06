function promise(fn){
    if (!(this instanceof promise)) {
        return new promise(fn);
    }
    this.promise = new Promise(function(resolve, reject){
        fn && fn(resolve, reject);
    });
};

promise.prototype.then = function(fn){
    return new this.constructor((resolve, reject) =>{
        this.promise.then(function(result){
            fn && fn(result, resolve, reject);
        }).catch(function(err) {
            reject(err);
        });
    });
}

promise.prototype.catch = function(fn) {
    this.promise.catch(fn);
    return this;
}
export default promise;