"use strict";
const { MongoClient } = require("mongodb");
// require("dotenv").config();
// const { MONGO_URI } = process.env;
const MONGO_URI =
  "mongodb+srv://chaofanwu:MatchBox2022@cluster0.ac4aq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "MatchBox";
const client = new MongoClient(MONGO_URI, options);
const db = client.db(dbName);

const sendResponse = (res, status, data, message = "no message included.") => {
  return res.status(status).json({ status, data, message });
};

const addInputMsg = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);

  try {
    const { camperId, campNum, shelterNum, msg } = req.body;
    const newValue = {
      timestamp: new Date(),
      msgId: camperId,
      msg: msg + " from: " + campNum + "-" + shelterNum,
    };
    await db.collection("voiceMsgs").insertOne(newValue);
    sendResponse(res, 200, null, "your message is sent!");
  } catch (error) {
    console.log(error.message);
  }

  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { addInputMsg };
