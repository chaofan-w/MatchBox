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

const pagination = async (req, res) => {
  const page = parseInt(req.params["page"]);
  const limit = parseInt(req.params["limit"]);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const allHelpTasks = await db
      .collection("helpTasks")
      .find()
      .sort({ status: -1, _id: -1 })
      // .sort({ status: -1 })
      .toArray();
    // console.log(allHelpTasks);

    if (allHelpTasks.length > 0) {
      const result = allHelpTasks.slice(startIndex, endIndex);
      sendResponse(
        res,
        200,
        result,
        `we found ${limit} tasks for page: ${page}, start from ${startIndex}, end at ${endIndex}.`
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

module.exports = { pagination };
