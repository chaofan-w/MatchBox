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

const addHelperToTask = async (req, res) => {
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

    if (taskHelperCheck[0].taskHelpers.includes(helperId)) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        `Camper ${helperId} is already retruited in this help task Id ${taskId}, no need to reapply`
      );
    }

    if (
      taskHelperCheck[0].taskHelpers.length + 1 <
      taskHelperCheck[0].helperNum
    ) {
      const taskUpdate = await db
        .collection("helpTasks")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $push: { taskHelpers: helperId } }
        );
      sendResponse(
        res,
        200,
        null,
        `camper ${helperId} is successfully added to task Id ${taskId}, now ${
          taskHelperCheck[0].taskHelpers.length + 1
        } of ${taskHelperCheck[0].helperNum} helpers are recruited.`
      );
    } else if (
      taskHelperCheck[0].taskHelpers.length + 1 ===
      taskHelperCheck[0].helperNum
    ) {
      const taskUpdate = await db
        .collection("helpTasks")
        .updateOne(
          { _id: ObjectId(taskId) },
          { $push: { taskHelpers: helperId }, $set: { status: "in-progress" } }
        );
      // sendResponse(
      //   res,
      //   200,
      //   null,
      //   `camper ${helperId} is successfully added to task Id ${taskId}, now all ${taskHelperCheck[0].helperNum} helpers are recruited.`
      // );

      //-----------after task status changed to "in-progress" which means all needed helpers are recruited already. The server will push message to all registered helpers and the owner of this project, so they can start the work now.--------------------------------------------------------------
      const taskDB = await db
        .collection("helpTasks")
        .find({ _id: ObjectId(taskId) })
        .toArray();
      const pushIds = [];
      pushIds.push(taskDB[0].taskOwner);
      taskDB[0].taskHelpers.forEach((helper) => {
        pushIds.push(helper);
      });
      const helpIds = pushIds.map((id) => ObjectId(id));
      const updateMsg = {
        msgTime: new Date(),
        msgContent: `All helpers of the task Id ${taskId} have been recruited, ready to go!`,
        msgRead: false,
      };
      const pushMsg = await db.collection("campers").updateMany(
        { _id: { $in: helpIds } },
        {
          $push: { msg: updateMsg },
        }
      );
      sendResponse(res, 200, updateMsg, "msg updated");
    } else {
      sendResponse(res, 400, null, "helper recruit is closed");
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { addHelperToTask };
