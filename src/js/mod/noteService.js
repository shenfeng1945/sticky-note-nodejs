let fetch = require('./fetch').fetch;
let url = require('./api').url;

class Note {
    static list(){
        return fetch(url.articleLists)
    }
    static editStar(id,star){
        return fetch(url.starEdit,{id,star})
    }
    static editNote(id,note){
        return fetch(url.articleEdit,{id,note})
    }
    static addNote(note,star,finish){
        return fetch(url.addNote,{note,star,finish})
    }
    static deleteNote(id){
        return fetch(url.deleteNote,{id})
    }
    static editFinish(id,finish){
        return fetch(url.editFinish,{id,finish})
    }
}
module.exports = Note;