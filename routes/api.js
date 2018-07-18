var express = require('express');
var router = express.Router()
var Note = require('../model/note')

/*
1. 获取所有的note: Get /api/notes          req:{},    res:{status:200,data:[{},{}]}  {status:400,errorMsg:'失败的原因'}
2. 创建一个note:Post /api/note/add         req:{note:'hello world'}   res:{status:200}  {status:400,errorMsg:'失败的原因'}
3. 修改一个note: Post  /api/note/edit      req:{note:'new note',id:3}
4. 删除一个note: Post /api/note/delete     req:{id:2}
*/ 

// get notes list
router.get('/notes',(req,res,next)=>{
    var opts = {raw:true}
    Note.findAll(opts).then(notes=>{
      res.send({status:200,data:notes})
    }).catch(()=>res.send({status:404,errorMsg:'数据库异常'}))
})
//修改星星等级
router.post('/notes/editStar',(req,res,next)=>{
  var noteId =req.body.id;
  var star = req.body.star;
  Note.update({star},{where:{id:noteId}}).then(lists=>{
      res.send({status:200,msg:'更新成功'})
  }).catch(()=>{
      res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
  })
})
//修改内容
router.post('/notes/edit',(req,res,next)=>{
    var noteId = req.body.id;
    var note = req.body.note;
    Note.update({text:note},{where:{id:noteId}}).then(lists=>{
       res.send({status:200,msg:'更新成功'})
    }).catch(_=>{
       res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
    })
})

router.post('/notes/add',(req,res,next)=>{
    if(!req.body.note){
       return res.send({status:400,errorMsg:'内容不能为空'})
    }
    var note = req.body.note;
    var star = req.body.star;
    Note.create({text:note,star}).then(()=>{
        res.send({status:200})
    }).catch(()=>{
        res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
    })
})

router.post('/notes/delete',(req,res,next)=>{
    var noteId = req.body.id
    Note.destroy({where:{id:noteId}}).then(deleteLen=>{
        if(deleteLen === 0){
            return res.send({status:404,errorMsg:'你没有权限'})
        }
        res.send({status:200})
    }).catch(()=>{
        res.send({status:404,errorMsg:'数据库异常或者你没有权限'})
    })
})

module.exports = router;