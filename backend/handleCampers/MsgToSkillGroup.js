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

const msgToSkillGroup = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const skill = req.params["skills"];

    const query = {
      skills: skill,
    };

    //---msg.$.msgRead, $reference the element match the condition-----------
    const updateDocument = {
      $push: {
        msg: {
          msgTime: new Date(),
          msgContent: `We are now in short of ${skill} task force, if you are available, please check our help center.`,
          msgRead: false,
        },
      },
    };

    const camperData = await db
      .collection("campers")
      .updateMany(query, updateDocument);

    if (camperData) {
      sendResponse(res, 200, camperData);
    } else {
      sendResponse(res, 400, null, `${skill} group not found`);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { msgToSkillGroup };
