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

const getCampKeys = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const camperKey = req.params["keys"];
    let campKeysObj = {};
    const campKeysDB = await db.collection("campers").find().toArray();

    campKeysDB.forEach((item) => {
      campKeysObj[item[camperKey]] = true;
    });

    const campKeys = Object.keys(campKeysObj).sort();
    console.log(campKeys);

    if (campKeys.length > 0) {
      sendResponse(
        res,
        200,
        campKeys,
        `we found ${campKeys.length} ${camperKey} types`
      );
    } else {
      sendResponse(res, 400, null, `no ${camperKey} found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getCampKeys };
