require('less/index.less')
require('../lib/icon.js')
var NoteManager = require('../mod/note-manager.js').NoteManager
var Event = require('../mod/event.js')
var WaterFall = require('mod/waterfall.js')
var Vue = require('../lib/vue.min.js')
var noteService = require('../mod/noteService');
let Toast = require('../mod/toast').Toast;
new Vue({
    el: '#app',
    data: {
        noteLists: null,
        starLength: 5,
    },
    created() {
        this.getNoteLists()
    },
    computed: {

    },
    methods: {
        getNoteLists() {
            noteService.list().then(res => {
                // this.noteLists = res.data;
                let data = res.data;
                data.map(item=>{
                    item.isEditing = false;
                })
                this.noteLists = data;
                this.setStar(res.data);
            })
        },
        changeStar(noteIndex,starIndex) {
            noteService.editStar(this.noteLists[noteIndex].id,''+(starIndex+1)).then(res=>{
              if(res.status === 200){
                  this.getNoteLists()
              }
            })
        },
        setStar(data) {
            this.noteLists.forEach(item => {
                let num = item.star;
                switch (num) {
                    case '0':
                        item['className'] = 'star0'
                        break;
                    case '1':
                        item['className'] = 'star1'
                        break;
                    case '2':
                        item['className'] = 'star2'
                        break;
                    case '3':
                        item['className'] = 'star3'
                        break;
                    case '4':
                        item['className'] = 'star4'
                        break;
                    case '5':
                        item['className'] = 'star5'
                        break;
                }
            })
        },
        editNote(item){
          item.isEditing = true;
        },
        switchNote(item){
          item.isEditing = false;
        },
        updateNote(item){
          noteService.editNote(item.id,item.text).then(res=>{
            Toast(res.msg)
          })
        }

    },
    directives:{
        focus:{
            inserted(el){
                el.focus()
            }
        }
    }
})
NoteManager.load()
// WaterFall.init($('#content'))
Event.on('waterfall', () => {
    WaterFall.init($('#content'))
})
