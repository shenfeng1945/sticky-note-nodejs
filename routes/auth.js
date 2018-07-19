var express = require('express') 
var router = express.Router()
//处理oauth2相关的认证
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;
var JirenguStrategy = require('passport-jirengu').Strategy;
// get auth
router.get('/jirengu',(req,res,next)=>{

})

module.exports = router;