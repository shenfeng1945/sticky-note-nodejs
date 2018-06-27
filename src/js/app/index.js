require('less/index.less')
require('../lib/icon.js')
var Event = require('../mod/event.js')
var WaterFall = require('mod/waterfall.js')

WaterFall.init($('#content'))
Event.on('waterfall',()=>{
    WaterFall.init($('#content'))
})
