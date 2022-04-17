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

const getCamperMsgs = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const id = req.params["camperId"];
    console.log(id);
    const objectId = ObjectId(id);
    console.log(objectId);

    const camperData = await db
      .collection("campers")
      .find({ _id: objectId })
      .project({ msg: 1 })
      .toArray();

    console.log(camperData);
    if (camperData) {
      if (camperData[0].msg.length > 0) {
        sendResponse(res, 200, camperData[0].msg);
      } else {
        sendResponse(res, 400, null, `no msg for the camper Id: ${id}`);
      }
    } else {
      sendResponse(res, 400, null, `${id} not found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getCamperMsgs };
