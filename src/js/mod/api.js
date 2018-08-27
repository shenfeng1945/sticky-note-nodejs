let url = {
    articleLists: '/api/notes',
    starEdit: '/api/notes/editStar',
    articleEdit: '/api/notes/edit',
    addNote: '/api/notes/add',
    deleteNote:'/api/notes/delete',
    editFinish: '/api/notes/finish',
}
let host = 'http://shenfeng1945.top:8080/sticky'
for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}
module.exports.url = url;