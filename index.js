const express = require("express");
const mongoose = require("mongoose");
//----//
require("dotenv").config();

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });
  //---//
  const personModel = require('./person')

//----//


  const app = express()


  app.listen(5000, () => console.log('server is running...'))