"use strict";
//-----------------connection string setup MongoDB-------------------------
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
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

const updateMsg = async (msgId, msg) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const msgIds = await db.collection("voiceMsgs").find().toArray();
    const query = { msgId: msgId };
    // const newValues = { $set: { ...req.body } };
    if (msgIds.find((dbmsgId) => dbmsgId.msgId === msgId && !dbmsgId.msg)) {
      const newValues = { $set: { msg: msg } };
      await db.collection("voiceMsgs").updateOne(query, newValues);
      sendResponse(res, 200, msg, "vo msg transcribed and saved");
    } else {
      sendResponse(res, 400, null, "no matched Id or msg existed");
    }
  } catch (error) {
    console.log(error.message);
  }
  // client.close();
  // console.log(`${dbName} disconnected!`);
};

// updateMsg(
//   "os2m20ruk9-cb56-45e6-b47e-cf28155a4f84",
//   "I am Natasha from Markham. I'm at the high school near town hall building. We have supplies and shelter here. Come join us."
// );

module.exports = { updateMsg };
