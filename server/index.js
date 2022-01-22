const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();
const PORT = config.get("serverPort");

// creating func which will connect with db and start server
// will add async when connecting db
const start = async () => {
  try {
    // first param is url to mongoDB
    mongoose.connect(config.get("dbURL"));

    // second param is a function with starts after server has been started
    app.listen(PORT, () => {
      console.log("Server started on port: ", PORT);
    });
  } catch (e) {}
};

start();
