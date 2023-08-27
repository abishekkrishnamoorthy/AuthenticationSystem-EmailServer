const express= require('express')
const router=express.Router()
const path=require('path')
const mysql=require('mysql')
const con=require('../servercon/dbc')  
const id=require('unique-username-generator')
const pass=require('quick-password-generator')
const mail=require('../servercon/maisc')
router.get('^/$|index',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})
router.post('/register',(req,res,next)=>{
    console.log(req.body)
    const username=req.body.username
    const password=req.body.password
    const email=req.body.email
    var sql = "INSERT INTO `sginup`(`username`,`email`, `passcode`) VALUES ('"+username+"','"+email+"','"+password+"')"
    con.query(sql,function (err, result) {
        if (err) throw err;
        console.log("inserted");
      });
    var userid=id.generateFromEmail(email,2)
    var passcode=pass(8)  
    var sqllogin="INSERT INTO `login`(`userid`, `passcode`) VALUES ('"+userid+"','"+passcode+"')" 
    con.query(sqllogin,function (err, result) {
        if (err) throw err;
        console.log("inserted");
    }); 
    var message = {
        from: "abi.heaventreecko@gmail.com",
        to: email,
        subject: "id",
        text: `<h1>userID:${userid}</h1><br> <h1>passcode:${passcode}</h1>`
    };
    mail.sendMail(message,(err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
        if (!err) res.sendFile(path.join(__dirname,'..','views','register.html'))
        else res.send("error")
    })
})
console.log()
module.exports=router