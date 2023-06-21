"use strict";
const usresModel=require("../model/user.model")
module.exports = (req, res, next) => {
  let bearerToken = req.headers.authorization.split(" ")[1];
  usresModel
    .bearer(bearerToken)
    .then((data) => {
      req.user = data;
      next();
    })
    .catch((err) => {
      next("invalid token");
    });
};
