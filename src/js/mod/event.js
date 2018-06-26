var EventCenter = function(){
    events = {};
    function on(evt, handler) {
        events[evt] = events[evt] || []
        events[evt].push({
            handler
        })
    }
    function fire(evt, args) {
        if (!events[evt]) {
            return
        }
        events.evt.forEach(item => item.handler(args))
    }
    return {on,fire}
}();
module.exports = EventCenter;