"use strict";
require("dotenv").config();
const server=require("./src/server");
const {sequelize}=require("./src/auth/model/index");
const port= process.env.PORT || 8000;


sequelize.sync().then(()=>{
    server.start(port);
})
