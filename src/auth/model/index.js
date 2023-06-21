"use strict"
const {Sequelize,DataTypes}=require("sequelize")
const POSGERS_URI=process.env.NODE_ENV=="test"?"sqlite::memory:":process.env.DB_URL;
let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    } :
    {};
    const sequelize=new Sequelize(POSGERS_URI,sequelizeOptions);

    module.exports = { 
        sequelize, DataTypes
     };