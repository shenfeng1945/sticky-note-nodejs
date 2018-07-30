require('less/index.less')
require('../lib/icon.js')
var NoteManager = require('../mod/note-manager.js').NoteManager
var Event = require('../mod/event.js')
var WaterFall = require('mod/waterfall.js')
var Vue = require('../lib/vue.min.js')
var noteService = require('../mod/noteService');
let Toast = require('../mod/toast').Toast;
let sortRank = require('../mod/sort.js').sortRank;
let vue = new Vue({
    el: '#app',
    data: {
        noteLists: null,
        starLength: 5,
        isAddNote: false,
        addNotes: {
            star: 0,
            text: '',
        },
        isNoteMove: false,
        curClient: [0, 0],
        moveClient: [0, 0],
        element: null,
        nowRank: 'all',
        sortRank: { direc: '+', kind: 'time' },
        isShowDropDown: false,
    },
    created() {
        this.getNoteLists();
        this.getLocal();
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        setLocal(){
          localStorage.setItem('sort',JSON.stringify(this.sortRank));
        },
        getLocal(){
           if(!localStorage.getItem('sort')){
             this.setLocal();
           }else{
             this.sortRank = JSON.parse(localStorage.getItem('sort'));
           }
        //    this.setSortRank()
        },
        getAllNoteLists() {
            this.nowRank = 'all';
            this.getNoteLists()
        },
        getNoteLists(){
            noteService.list().then(res => {
                this.setNoteAttri(res);
                if(this.nowRank === 'sort'){
                  this.setLocal();
                  this.setSortRank();
                }
            })
        },
        getNoteDoneLists() {
            this.nowRank = 'haveDone';
            noteService.list().then(res => {
                res.data = res.data.filter(item => item.finish)
                this.setNoteAttri(res);
                // this.noteLists = res.data;
                let data = res.data;
                data.map(item => {
                    item.isEditing = false;
                    item.left = 0;
                    item.top = 0;
                })
                this.noteLists = data;
                this.setStar(res.data);
                setTimeout(() => {
                    this.doWaterFall();
                }, 0)
                this.setSortRank()
            })
        },
        setNoteAttri(res) {
            let data = res.data;
            data.map(item => {
                item.isEditing = false;
                item.left = 0;
                item.top = 0;
                item.isTop = false;
            })
            this.noteLists = data;
            this.setStar(res.data);
            setTimeout(() => {
                this.doWaterFall();
            }, 0)
        },
        changeStar(noteIndex, starIndex) {
            noteService.editStar(this.noteLists[noteIndex].id, '' + (starIndex + 1)).then(res => {
                if (res.status === 200) {
                    this.getNoteLists()
                } else if (res.status === 400) {
                    Toast(res.errorMsg);
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
        editNote(item) {
            item.isEditing = true;
        },
        switchNote(item) {
            item.isEditing = false;
        },
        updateNote(item) {
            noteService.editNote(item.id, item.text).then(res => {
                if(res.status === 200){
                  Toast(res.msg)
                }else if(res.status === 400){
                  Toast(res.errorMsg);
                }
            })
        },
        addNote() {
            if (!this.addNotes.text) {
                Toast('内容不可为空');
                return;
            }
            noteService.addNote(this.addNotes.text, this.addNotes.star + '', false).then(res => {
                if (res.status === 200) {
                    this.getNoteLists();
                    this.closeModel();
                } else if (res.status === 400) {
                    Toast(res.errorMsg,1000,'error');
                    return;
                }
            })
        },
        closeModel() {
            this.isAddNote = false;
            this.addNotes.text = '';
            this.addNotes.star = 0;
        },
        mousedown(e, item) {
            this.isNoteMove = true;
            item.isTop = true;
            this.curClient = [e.clientX - item.left, e.clientY - item.top];
        },
        mousemove(e, item) {
            if (this.isNoteMove) {
                item.left = e.clientX - this.curClient[0];
                item.top = e.clientY - this.curClient[1];
            }
        },
        mouseup(item) {
            item.isTop = false;
            this.isNoteMove = false;
        },
        deleteNote(id) {
            noteService.deleteNote(id).then(res => {
                if (res.status === 200) {
                    Toast('删除成功!')
                    this.getNoteLists();
                } else if (res.status === 400) {
                    Toast(res.errorMsg);
                }
            })
        },
        initNoteStyle(el) {
            Array.from(el.children).forEach((item, i) => {
                this.noteLists[i].left = parseInt(item.style.getPropertyValue('left'))
                this.noteLists[i].top = parseInt(item.style.getPropertyValue('top'))
            })
        },
        doWaterFall() {
            WaterFall.init(this.element);
            this.initNoteStyle(this.element);
        },
        finish(item) {
            noteService.editFinish(item.id, !item.finish).then(res => {
                if (res.status === 200) {
                    item.finish = !item.finish;
                } else if (res.status === 400) {
                    Toast(res.errorMsg)
                }
            })
            if (this.nowRank === 'haveDone') {
                this.getNoteDoneLists();
            }
        },
        showDropDown() {
            this.isShowDropDown = !this.isShowDropDown;
        },
        getNoteSort() {
            if (this.nowRank !== 'sort') {
                this.nowRank = 'sort';
            } else {
                this.sortRank.direc = this.sortRank.direc === '+' ? '-' : '+';
            }
            noteService.list().then(res => {
              this.setNoteAttri(res);
              this.setLocal();
              this.setSortRank();
              this.doWaterFall();
            })
        },
        setSortRankKind(string) {
            this.isShowDropDown = false;
            this.sortRank.kind = string;
            this.setLocal();
            if(this.nowRank === 'sort'){
              this.setSortRank();
              this.doWaterFall();
            }
        },
        setSortRank() {
          this.noteLists = sortRank.replaceArray(this.noteLists,this.sortRank)
        },
        closeDropDown(e){
            if(e.target.className === 'odd'){
                return;
            }
            if(this.isShowDropDown){
              this.isShowDropDown = false;
            }
        }
       
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            }
        },
        waterfall: {
            inserted(el) {
                WaterFall.init(el);
                vue.initNoteStyle(el);
                vue.element = el;
                window.onresize = () => {
                    WaterFall.init(vue.element);
                    vue.initNoteStyle(vue.element);
                }
            }
        }
    }
})
// NoteManager.load()
// WaterFall.init($('#content'))
// Event.on('waterfall', () => {
//     WaterFall.init($('#content'))
// })
