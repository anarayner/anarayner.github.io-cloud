const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");

app.use(express.json());
// first param is url where router will be handeled, second is router itself
app.use("/api/auth", authRouter);

// creating func which will connect with db and start server
// will add async when connecting db
const start = async () => {
  try {
    // first param is url to mongoDB
    mongoose.connect(config.get("dbURL"));
    console.log("connect");
    // second param is a function with starts after server has been started
    app.listen(PORT, () => {
      console.log("Server started on port: ", PORT);
    });
  } catch (e) {}
};

start();
