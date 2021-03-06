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

const changeTaskDone = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { taskId } = req.body;

    const taskHelperCheck = await db
      .collection("helpTasks")
      .find({ _id: ObjectId(taskId) })
      .toArray();

    if (taskHelperCheck[0].status === "Completed") {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(res, 400, null, `${taskId} is completed and closed.`);
    }

    if (taskHelperCheck[0].status === "recruit") {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        `${taskId} is still in retruiting process`
      );
    }

    if (taskHelperCheck[0].status === "in-progress") {
      const taskUpdate = await db
        .collection("helpTasks")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $set: { status: "Completed" } }
        );
      sendResponse(
        res,
        200,
        null,
        `Task Id ${taskId} is successfully completed.`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { changeTaskDone };
