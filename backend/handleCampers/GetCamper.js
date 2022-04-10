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

const getCamper = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  try {
    const { lastname, campnum, shelternum } = req.query;
    if (!/^[A-Za-z]+$/i.test(lastname.trim())) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(res, 400, null, "please insert corret name format.");
    }

    if (!/^MTL-CAMP-[0-9]{2}$/i.test(campnum.trim())) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        "please insert corret campNum format, e.g., MTL-CAMP-08."
      );
    }
    if (!/^[0-9]{2,3}$/i.test(shelternum.trim())) {
      client.close();
      console.log(`${dbName} disconnected!`);
      return sendResponse(
        res,
        400,
        null,
        "please insert corret shelterNum format, e.g.,036."
      );
    }

    const camper = await db
      .collection("campers")
      .find({
        $and: [
          {
            lastName:
              lastname[0].toUpperCase() + lastname.substring(1).toLowerCase(),
          },
          { campNum: campnum.toUpperCase() },
          { shelterNum: shelternum },
        ],
      })
      .toArray();
    console.log(camper);

    if (camper.length > 0) {
      sendResponse(res, 200, camper, "camper info found");
    } else {
      sendResponse(
        res,
        400,
        null,
        `the camper login info: ${lastname}, ${campnum}-${shelternum} not found`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

module.exports = { getCamper };
