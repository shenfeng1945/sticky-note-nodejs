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
    res.setHeader('Access-Control-Allow-Origin','*')
    // var opts = {raw:true}
    var opts = {where:{id:0}}
    if(req.session && req.session.user){
      let userId = req.session.user.id
      opts = {where:{userId}}
    }      
    Note.findAll(opts).then(notes=>{
      res.send({status:200,data:notes})
    }).catch(()=>res.send({status:404,errorMsg:'数据库异常'}))
})
//修改星星等级
router.post('/notes/editStar',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.session || !req.session.user){
        return res.send({status:400,errorMsg:'请先登录'})
      }
  var noteId =req.body.id;
  var userId = req.session.user.id
  var star = req.body.star;
  Note.update({star},{where:{id:noteId,userId}}).then(lists=>{
      res.send({status:200,msg:'更新成功'})
  }).catch(()=>{
      res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
  })
})
//修改内容
router.post('/notes/edit',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.session || !req.session.user){
        return res.send({status:400,errorMsg:'请先登录'})
      }
    var noteId = req.body.id;
    var note = req.body.note;
    var userId = req.session.user.id
    Note.update({text:note},{where:{id:noteId,userId}}).then(lists=>{
       res.send({status:200,msg:'更新成功'})
    }).catch(_=>{
       res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
    })
})

router.post('/notes/finish',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.session || !req.session.user){
        return res.send({status:400,errorMsg:'请先登录'})
      }
    var noteId = req.body.id;
    var finish = req.body.finish;
    var userId = req.session.user.id
    console.log(noteId,finish,'hello')
    Note.update({finish},{where:{id:noteId,userId}}).then(lists=>{
       res.send({status:200,msg:'修改成功'})
    }).catch(_=>{
       res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
    })
})

router.post('/notes/add',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Request-Method','OPTIONS,PUT,GET,POST')
    if(!req.session || !req.session.user){
       return res.send({status:400,errorMsg:'请先登录'})
    }
    var note = req.body.note;
    var userId = req.session.user.id
    var star = req.body.star;
    var finish = req.body.finish;
    Note.create({text:note,star,finish,userId}).then(()=>{
        res.send({status:200})
    }).catch(()=>{
        res.send({status:400,errorMsg:'数据库异常或者你没有权限'})
    })
})

router.post('/notes/delete',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    if(!req.session || !req.session.user){
        return res.send({status:400,errorMsg:'请先登录'})
      }
    var noteId = req.body.id
    var userId = req.session.user.id
    Note.destroy({where:{id:noteId,userId}}).then(deleteLen=>{
        if(deleteLen === 0){
            return res.send({status:404,errorMsg:'你没有权限'})
        }
        res.send({status:200})
    }).catch(()=>{
        res.send({status:404,errorMsg:'数据库异常或者你没有权限'})
    })
})

module.exports = router;