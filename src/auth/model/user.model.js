"use strict"
const {sequelize,DataTypes}=require("./index")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
let secret=process.env.SECRET;
const users=sequelize.define("users",{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    token:{
        type:DataTypes.VIRTUAL
    }
})

users.basic=async(username,password)=>{
let record=await users.findOne({where:{username:username}})
let isValid=await bcrypt.compare(password,record.password)
if(isValid){
    let newToken= jwt.sign({username:username,password:password},secret, { expiresIn: 15 * 60 })
    record.token=newToken;
    return record;
} else {
    throw new Error("invalid user");
}
}

users.bearer=async(token)=>{
   let paresedToken=jwt.verify(token,secret);
   let record=await users.findOne({where:{username:paresedToken.username}})
if(record.username){
    return record
}   else{
    throw new Error("Invalid user")
}
}
module.exports=users;