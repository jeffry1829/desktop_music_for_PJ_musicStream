function cp(src, dst){
    for(var index in src._events){
        var event = src._events[index];
        dst.on(index, event[0].listener);
    }
}

module.exports = cp;