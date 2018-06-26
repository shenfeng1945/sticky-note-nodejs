var Toast = require('./toast.js').Toast

function Note(opts){
    
}
Note.prototype = {
   color:[],
   defaultOpts:{
       id:'',
       $ct:$('#content').length>0?$('#content'):$('body'),//容器
       context:'input here'//内容
   }, 
   initOpts:function(opts){
     this.opts = $.extend({},this.defaultOpts,opts||{})
     if(this.opts.id){
         this.id = this.opts.id;
     }
   },
   createNote:function(){
       var tpl = ``
   }
}