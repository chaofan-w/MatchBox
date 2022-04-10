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

const pushMsgToHelpers = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { taskId, msgContent, msgRead } = req.body;
    // console.log(req.body);
    // const objectId = ObjectId(taskId);
    const updateMsg = {
      msgTime: new Date(),
      msgContent: msgContent,
      msgRead: msgRead,
    };

    const helpTask = await db
      .collection("helpTasks")
      .find({ _id: ObjectId(taskId) })
      .toArray();
    console.log(helpTask);

    if (helpTask[0].taskHelpers.length > 0) {
      const helpIds = helpTask[0].taskHelpers.map((id) => ObjectId(id));
      console.log(helpIds);
      const pushMsg = await db
        .collection("campers")
        .updateMany({ _id: { $in: helpIds } }, { $push: { msg: updateMsg } });
      sendResponse(res, 200, updateMsg, "msg updated");
    } else {
      sendResponse(res, 400, null, "no helpers recruited so far");
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { pushMsgToHelpers };
