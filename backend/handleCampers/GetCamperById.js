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

const getCamperById = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const camperId = req.params["camperId"];

    const camperInfo = await db
      .collection("campers")
      .find({ _id: ObjectId(camperId) })
      .toArray();

    if (camperInfo.length > 0) {
      sendResponse(res, 200, camperInfo, `we found camper Id ${camperId} info`);
    } else {
      sendResponse(res, 400, null, `no camper found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getCamperById };
