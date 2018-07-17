var Toast = require('./toast.js').Toast;
var Event = require('./event.js');
var starModel = require('../../model/star').star;
var Vue = require('../lib/vue.min.js')
function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.setLayout()
    this.bindEvent();
    this.initVue();
}
Note.prototype = {
    defaultOpts: {
        id: '',
        $ct: $('#content').length > 0 ? $('#content') : $('body'), //容器
        context: 'input here', //内容
        createdAt: '',
        $ctPosi:null,
        star:'',
    },
    initOpts: function (opts) {
        this.opts = $.extend({}, this.defaultOpts, opts || {})
        if (this.opts.id) {
            this.id = this.opts.id;
        }
    },
    createNote: function () {
        var tpl = ` <div class="note">
                      <div class="head-note">
                         <div class="time"></div>
                         <div class="close">
                             <svg class="icon icon-20">
                                <use xlink:href="#icon-close"></use>
                             </svg>
                          </div>
                       </div>
                       <div class="context">
                       </div>
                       <div class="stars">
                          <svg class="icon icon-18 gray" @click="changeStar" viewBox="0 0 1024 1024" width="100%" height="100%">
                            <path d="M956 398.5c-10.4-31-36.9-53.3-69.2-58.2L682.1 309l-91.6-195c-7.3-15.6-18.9-28.5-33.6-37.4-13.5-8.2-29.1-12.5-44.9-12.5-15.9 0-31.4 4.3-44.9 12.5-14.7 8.9-26.3 21.8-33.6 37.4l-91.6 195-204.7 31.3c-32.3 4.9-58.8 27.2-69.2 58.2-10.4 31-2.6 64.7 20.2 88.1l150.7 154.5-35.6 218c-4.1 25.2 3 50.7 19.5 70.1 16.6 19.5 40.7 30.7 66.2 30.7 14.6 0 29.1-3.8 42-10.9l181-100 181 100.1c12.9 7.1 27.4 10.9 42 10.9 25.5 0 49.6-11.2 66.2-30.7 16.5-19.4 23.6-44.9 19.5-70.1l-35.6-218 150.7-154.5c22.8-23.4 30.5-57.2 20.2-88.2z"></path>
                          </svg>
                       </div>
                       <div class="finish">已完成</div>
                    </div>`
        
        this.$note = $(tpl);
        this.$note.find('.context').text(this.opts.context);
        this.$note.find('.time').text(this.opts.createdAt);
        this.setStar(this.$note.find('.star'));
        this.opts.$ct.append(this.$note);
        this.opts.$ctPosi = this.opts.$ct[0].getBoundingClientRect();
    },
    initVue(){
        new Vue({
            el:'#app',
            data:{
                a:'hello'
            },
            methods:{
              changeStar(){
                  console.log('hello')
              }
            }
        })
    },
    setStar:function($el){
        let star = +this.opts.star;
        this.$note.find('.stars').children().each((i,item)=>{
           if(i<star){
              item.classList.add('blue')
           }else{
              item.classList.remove('blue')
           }
        })
    },
    setLayout: function () {
        var self = this;
        if (self.clk) {
            clearTimeout(self.clk)
        }
        self.clk = setTimeout(function () {
            Event.fire('waterfall')
        }, 100)
    },
    bindEvent: function () {
        var self = this,
            $note = this.$note,
            $noteHead = $note.find('.head-note'),
            $noteCt = $note.find(),
            $close = $note.find('.close');
            $noteStar = $note.find('.stars');
            
        $noteStar.on('click','.icon',(e)=>{
           let index = e.currentTarget.index()
           console.log(index)
        })
        $close.on('click', () => {
            self.delete();
        })
        // $noteHead.on('mousedown', eDown => {
        //     evtX = eDown.pageX;
        //     evtY = eDown.pageY;
        //     console.log(evtX,evtY,'down')
        //     $noteHead.on('mousemove', mouseMove)
        // })
        // $noteHead.on('mouseup',()=>{
        //     $noteHead.off('mousemove',mouseMove)
        // })
        // mouseMove = eMove => {
        //     $note.css({
        //       left:parseInt($note.css('left')) + eMove.pageX - evtX,
        //       top:parseInt($note.css('top'))+ eMove.pageY - evtY
        //     })
        // }
    },
    delete: function () {
        var self = this;
        $.post('/api/note/delete', {
                id: this.id
            })
            .done(ret => {
                if (ret.status === 200) {
                    Toast('delete success');
                    self.$note.remove();
                    Event.fire('waterfall')
                } else {
                    Toast(ret.errorMsg);
                }
            })
    }

}

module.exports.Note = Note;
