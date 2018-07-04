var Toast = require('./toast.js').Toast
var Event = require('./event.js').Event

function Note(opts) {

}
Note.prototype = {
    defaultOpts: {
        id: '',
        $ct: $('#content').length > 0 ? $('#content') : $('body'), //容器
        context: 'input here' //内容
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
        this.opts.$ct.append(this.$note);
    },
    setLayout:function(){
        var self = this;
        if(self.clk){
            clearTimeout(self.clk)
        }
        self.clk = setTimeout(function(){
            Event.fire('waterfall')
        },100)
    },
    bindEvent:function(){
        
    }
    
}
