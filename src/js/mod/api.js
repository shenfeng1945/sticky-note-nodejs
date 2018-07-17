let url = {
    articleLists: '/api/notes',
    starEdit: '/api/notes/editStar',
    articleEdit: '/api/notes/edit'
}
let host = ''
for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}
module.exports.url = url;