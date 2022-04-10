"use strict";
const { response } = require("express");
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

const addNewHelpTask = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { ownerId, skillNeed, helperNum } = req.body;
    const ownerInfo = await db
      .collection("campers")
      .find({ _id: ObjectId(ownerId) })
      .toArray();
    console.log(ownerInfo);

    let newValue = {
      taskOwner: ownerId,
      taskSkill: skillNeed,
      location: `${ownerInfo[0].campNum}-${ownerInfo[0].shelterNum}`,
      helperNum: helperNum,
      taskHelpers: [],
      status: "recruit",
    };

    const newTask = await db.collection("helpTasks").insertOne(newValue);
    sendResponse(res, 200, newValue, "a new help task is successfully added.");
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { addNewHelpTask };
