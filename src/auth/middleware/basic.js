"use strict"
const base64=require("base-64")
const usresModel=require("../model/user.model")
module.exports=(req,res,next)=>{
    let paresedPart=req.headers.authorization.split(' ');

    let encodedStr=base64.decode(paresedPart.pop())
    let [username,password]=encodedStr.split(":");
    usresModel.basic(username,password).then((data)=>{
        req.user=data;
        next();
    }).catch((err)=>{
        next('invalid token');
    })
}