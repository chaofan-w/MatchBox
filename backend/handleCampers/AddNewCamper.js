"use strict";
//-----------------connection string setup MongoDB-------------------------
const { MongoClient } = require("mongodb");
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

const addNewCamper = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { firstName, lastName, skills, campNum, shelterNum } = req.body;
    if (
      !/^[A-Za-z]+$/i.test(firstName.trim()) ||
      !/^[A-Za-z]+$/i.test(lastName.trim())
    ) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(res, 400, null, "please insert corret name format.");
    }

    const checkUserName = await db
      .collection("campers")
      .find({
        $and: [{ firstName: firstName }, { lastName: lastName }],
      })
      .toArray();

    if (checkUserName.length > 0) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        `the user name <${firstName} ${lastName}> is registered already, only one registration for each user name`
      );
    }

    const checkShelterNum = await db
      .collection("campers")
      .find({
        $and: [{ campNum: campNum }, { shelterNum: shelterNum }],
      })
      .toArray();

    if (checkShelterNum.length > 0) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        `the shelterNum ${campNum}-${shelterNum} is registered already, only one registration for each shelter spot.`
      );
    }
    let newValue = req.body;
    newValue = { ...newValue, msg: [] };

    const newCamper = await db.collection("campers").insertOne(newValue);
    sendResponse(res, 200, newCamper, "a neww camper is successfully added.");
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { addNewCamper };
