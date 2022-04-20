const { MongoClient } = require("mongodb");
const axios = require("axios");
const res = require("express/lib/response");
const { updateMsg } = require("./updateMsg");
// require("dotenv").config();
// const { MONGO_URI } = process.env;
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: "b555fcac6593482881d6ea16c8537589",
    "content-type": "application/json",
  },
});
const MONGO_URI =
  "mongodb+srv://chaofanwu:MatchBox2022@cluster0.ac4aq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

const transcribeAndUpdateMsgs = async (req, res) => {
  let msgIds;
  try {
    await client.connect();
    console.log(`${dbName} connected!`);

    msgIds = await db.collection("voiceMsgs").find().toArray();
    // console.log(msgIds);
    assemblyIds = msgIds.filter((item) => item.msgId[0] === "o");
    console.log(assemblyIds);
    assemblyIds.forEach(async (msgId) => {
      await assembly.get(`/transcript/${msgId.msgId}`).then((res) => {
        console.log("text: ", res.data.text, "id:", res.data.id);
        updateMsg(res.data.id, res.data.text);
      });
    });
    sendResponse(res, 200, null, "trascription updated to MongoDB");
  } catch (error) {
    console.log(error.meesage);
  }

  client.close();
  console.log(`${dbName} disconnected!`);
  // console.log(transcriptions);
  // return transcriptions;
};

// transcribeAndUpdateMsgs();
module.exports = { transcribeAndUpdateMsgs };
