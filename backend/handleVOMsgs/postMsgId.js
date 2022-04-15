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

const postMsgId = async (timestamp, data, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  // const msgIds = await db.collection("audio").find().toArray();
  try {
    await db
      .collection("voiceMsgs")
      .insertOne({ timestamp: timestamp, msgId: data });
  } catch (error) {
    console.log(error.message);
  }

  // client.close();
  // console.log(`${dbName} disconnected!`);
};

module.exports = { postMsgId };
