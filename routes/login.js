const express= require('express')
const router=express.Router()
const path=require('path')
const mysql=require('mysql')
const con=require('../servercon/dbc')  
 

router.get('^/$|index$|signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','login.html'))
})

router.post('/welcome',(req,res,next)=>{
    console.log(req.body)
    const user=req.body.user
    const passcode=req.body.password
    var sql="SELECT * FROM `login` WHERE `userid`='"+user+"'  AND `passcode` = '"+passcode+"'"
    con.query(sql,(error, results, fields)=>{
        if(results.length>0){
            res.sendFile(path.join(__dirname,'..','views','welcome.html'))
        }
        else{
            res.redirect('/login')
        }
    })
    
})
module.exports=router