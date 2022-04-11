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

const getHelpTasksByCamperId = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const camperId = req.params["camperId"];
    console.log(camperId);

    const tasksOfCamper = await db
      .collection("helpTasks")
      .find({
        $or: [{ taskOwner: camperId }, { taskHelpers: { $in: [camperId] } }],
      })
      .sort({ _id: -1 })
      .toArray();

    if (tasksOfCamper.length > 0) {
      sendResponse(
        res,
        200,
        tasksOfCamper,
        `we found ${tasksOfCamper.length} help tasks about the camper Id ${camperId}`
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

module.exports = { getHelpTasksByCamperId };
