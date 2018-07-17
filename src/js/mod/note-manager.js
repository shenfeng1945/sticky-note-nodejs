let Toast = require('./toast.js').Toast;
// let Note = require('./note.js').Note;

var NoteManager = (function () {
    // function load() {
    //     $.get('/api/notes')
    //         .done(ret => {
    //             if (ret.status === 200) {
    //             //    ret.data.forEach((article,i)=>{
    //             //      new Note({
    //             //          id:article.id,
    //             //          context:article.text,
    //             //          createdAt:article.createdAt.split(' ')[0].replace(/\-/,'年').replace(/\-/,'月').replace(/$/,'日'),
    //             //          star:article.star,
    //             //      })
    //             //    }) 
               
    //             } else {
    //                 Toast(ret.errorMsg);
    //             }
    //         })
    //         .fail(() => {
    //             Toast('网络异常')
    //         })
    // }
    function load(){
       
    }
    return {
        load
    }
})()

module.exports.NoteManager = NoteManager;
