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

const deleteHelperFromTask = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { helperId, taskId } = req.body;

    const taskHelperCheck = await db
      .collection("helpTasks")
      .find({ _id: ObjectId(taskId) })
      .toArray();

    if (taskHelperCheck[0].status === "Completed") {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(res, 400, null, `${taskId} is completed and closed.`);
    }

    if (!taskHelperCheck[0].taskHelpers.includes(helperId)) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        `${taskId} is not among this help task force.`
      );
    }

    if (taskHelperCheck[0].taskHelpers.length < taskHelperCheck[0].helperNum) {
      const taskUpdate = await db
        .collection("helpTasks")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $pull: { taskHelpers: helperId } }
        );
      sendResponse(
        res,
        200,
        null,
        `camper ${helperId} is successfully removed from task Id ${taskId}, now ${
          taskHelperCheck[0].taskHelpers.length - 1
        } of ${taskHelperCheck[0].helperNum} helpers are recruited.`
      );
    } else if (
      taskHelperCheck[0].taskHelpers.length === taskHelperCheck[0].helperNum
    ) {
      const taskUpdate = await db
        .collection("helpTasks")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $pull: { taskHelpers: helperId }, $set: { status: "recruit" } }
        );
      sendResponse(
        res,
        200,
        null,
        `camper ${helperId} is successfully removed from task Id ${taskId}, now ${
          taskHelperCheck[0].taskHelpers.length - 1
        } of ${taskHelperCheck[0].helperNum} helpers are recruited.`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { deleteHelperFromTask };
