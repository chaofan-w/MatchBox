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

const getHelpTasks = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const allHelpTasks = await db
      .collection("helpTasks")
      .find()
      .sort({ status: -1 })
      .toArray();

    if (allHelpTasks.length > 0) {
      sendResponse(
        res,
        200,
        allHelpTasks,
        `we found ${allHelpTasks.length} help tasks`
      );
    } else {
      sendResponse(res, 400, null, `no help tasks found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getHelpTasks };
