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

const changeMsgRead = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const id = req.params["camperId"];
    //-------------change string to a Date object---------------------
    const msgTime = new Date(req.params["msgTime"]);
    console.log(msgTime);
    const objectId = ObjectId(id);

    const query = {
      _id: objectId,
      "msg.msgTime": msgTime,
    };

    //---msg.$.msgRead, $reference the element match the condition-----------
    const updateDocument = { $set: { "msg.$.msgRead": true } };

    const camperData = await db
      .collection("campers")
      .updateOne(query, updateDocument, options);

    if (camperData) {
      sendResponse(res, 200, camperData);
    } else {
      sendResponse(res, 400, null, `${id} not found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { changeMsgRead };
