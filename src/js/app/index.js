require('less/index.less')
require('../lib/icon.js')
var NoteManager = require('../mod/note-manager.js').NoteManager
var Event = require('../mod/event.js')
var WaterFall = require('mod/waterfall.js')
NoteManager.load()
// WaterFall.init($('#content'))
Event.on('waterfall',()=>{
    WaterFall.init($('#content'))
})
