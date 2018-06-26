var express = require('express');
var router = express.Router()
var Note = require('../model/note.js')

/*
1. 获取所有的note: Get /api/notes          req:{},    res:{status:200,data:[{},{}]}  {status:400,errorMsg:'失败的原因'}
2. 创建一个note:Post /api/note/add         req:{note:'hello world'}   res:{status:200}  {status:400,errorMsg:'失败的原因'}
3. 修改一个note: Post  /api/note/edit      req:{note:'new note',id:3}
4. 删除一个note: Post /api/note/delete     req:{id:2}
*/ 

// get notes list
router.get('/notes',(req,res,next)=>{
    var opts = {raw:true}
})
