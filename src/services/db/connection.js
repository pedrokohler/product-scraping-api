require("dotenv").config();
const mongoose = require("mongoose");

const connString = process.env.MONGO_CONNECTION_STRING;

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to database.");
});

db.on("error", console.error.bind(console, "connection error:"));
