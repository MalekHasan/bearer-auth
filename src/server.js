"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const usersModel = require("./auth/model/user.model");
const basic = require("./auth/middleware/basic");
const bearer = require("./auth/middleware/bearer");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("server is running");
});
app.post("/signup", async (req, res) => {
  try {
    let username = req.body.username;
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let record = await usersModel.create({
      username: username,
      password: hashPassword,
    });
    console.log(record);
    res.status(201).json(record);
  } catch (err) {
    throw new Error("Invalid user");
  }
});
app.post("/signin",basic,(req,res)=>{
  res.status(200).json(req.user);
})
app.get("/mybook",bearer,(req,res)=>{
  res.status(200).json({message:"hi there"});
})
function start(port) {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

module.exports = {
  start: start,
  app: app,
};
