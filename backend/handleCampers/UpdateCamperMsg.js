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

const updateCamperMsg = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { camperId, msgContent, msgRead } = req.body;
    console.log(req.body);
    const objectId = ObjectId(camperId);
    const updateMsg = {
      msgTime: new Date(),
      msgContent: msgContent,
      msgRead: msgRead,
    };

    await db
      .collection("campers")
      .updateOne({ _id: objectId }, { $push: { msg: updateMsg } });
    sendResponse(res, 200, updateMsg, "msg updated");
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { updateCamperMsg };
