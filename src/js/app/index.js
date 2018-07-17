require('less/index.less')
require('../lib/icon.js')
var NoteManager = require('../mod/note-manager.js').NoteManager
var Event = require('../mod/event.js')
var WaterFall = require('mod/waterfall.js')
var Vue = require('../lib/vue.min.js')
var noteService = require('../mod/noteService');
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
                this.noteLists = res.data;
                this.setStar(res.data)
            })
        },
        // setStar(data){
        //   data.forEach((note,i) =>{
        //     let num = +note.star; 
        //     let arr = [false,false,false,false,false];
        //     arr.forEach((item,j)=>{
        //        if(j<num){
        //          arr[j] = true;
        //        }else{
        //          arr[j] = false;
        //        }
        //     })
        //     this.noteLists[i].starArr = arr
        //   })
        // },
        changeStar(noteIndex,starIndex) {
            // this.noteLists[noteIndex].star = ''+(starIndex+1)
            // this.setStar(this.noteLists)
            // console.log(this.noteLists[0].className)
            console.log(this.noteLists[noteIndex])
            noteService.editStar(this.noteLists[noteIndex].id,''+(starIndex+1))
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
        }
    }
})
NoteManager.load()
// WaterFall.init($('#content'))
Event.on('waterfall', () => {
    WaterFall.init($('#content'))
})
