"use strict";
//-----------------connection string setup MongoDB-------------------------
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
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

const getVOMsgs = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const voMsgData = await db
      .collection("voiceMsgs")
      .find()
      // .sort({ timestamp: -1 })
      // .toArray();
      .toArray();

    if (voMsgData.length > 0) {
      sendResponse(res, 200, voMsgData);
    } else {
      sendResponse(res, 400, null, `no VoMsgs found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getVOMsgs };
