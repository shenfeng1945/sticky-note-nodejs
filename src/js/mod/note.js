var Toast = require('./toast.js').Toast
var Event = require('./event.js')
// var Vue = require('../lib/vue.min.js')

function Note(opts) {
    this.initOpts(opts);
    this.createNote();
    this.setLayout()
    this.bindEvent();
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
                    </div>`
        
        this.$note = $(tpl)
        this.$note.find('.context').text(this.opts.context);
        this.$note.find('.time').text(this.opts.createdAt);
        this.setStar(this.$note.find('.star'));
        this.opts.$ct.append(this.$note);
        this.opts.$ctPosi = this.opts.$ct[0].getBoundingClientRect();
    },
    setStar:function($el){
        var starGray = `<svg class="icon icon-18">
                           <use xlink:href="#icon-star"></use>
                        </svg>`
        var starBlue = `<svg class="icon icon-18">
                         <use xlink:href="#icon-star-blue"></use>
                        </svg>`
        let star = +this.opts.star;
        
        // this.$note.find('.starts').append()
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
