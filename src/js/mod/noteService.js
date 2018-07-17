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
}
module.exports = Note;