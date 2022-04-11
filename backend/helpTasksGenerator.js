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

// const sendResponse = (res, status, data, message = "no message included.") => {
//   return res.status(status).json({ status, data, message });
// };

const helpTasksGenerator = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected!`);
  const ownerIds = [
    "624f98557163718cbf9ebd2a",
    "624f98557163718cbf9ebd2b",
    "624f98557163718cbf9ebd2c",
    "624f98557163718cbf9ebd2d",
    "624f98557163718cbf9ebd2e",
    "624f98557163718cbf9ebd2f",
    "624f98557163718cbf9ebd30",
    "624f98557163718cbf9ebd31",
    "624f98557163718cbf9ebd32",
    "624f98557163718cbf9ebd33",
    "624f98557163718cbf9ebd34",
    "624f98557163718cbf9ebd35",
    "624f98557163718cbf9ebd36",
    "624f98557163718cbf9ebd37",
    "624f98557163718cbf9ebd38",
    "624f98557163718cbf9ebd39",
    "624f98557163718cbf9ebd3a",
    "624f98557163718cbf9ebd3b",
    "624f98557163718cbf9ebd3c",
    "624f98557163718cbf9ebd3d",
    "624f98557163718cbf9ebd3e",
    "624f98557163718cbf9ebd3f",
    "624f98557163718cbf9ebd40",
    "624f98557163718cbf9ebd41",
    "624f98557163718cbf9ebd42",
    "624f98557163718cbf9ebd43",
    "624f98557163718cbf9ebd44",
    "624f98557163718cbf9ebd45",
    "624f98557163718cbf9ebd46",
    "624f98557163718cbf9ebd47",
    "624f98557163718cbf9ebd48",
    "624f98557163718cbf9ebd49",
    "624f98557163718cbf9ebd4a",
    "624f98557163718cbf9ebd4b",
    "624f98557163718cbf9ebd4c",
    "624f98557163718cbf9ebd4d",
    "624f98557163718cbf9ebd4e",
    "624f98557163718cbf9ebd4f",
    "624f98557163718cbf9ebd50",
    "624f98557163718cbf9ebd51",
    "624f98557163718cbf9ebd52",
    "624f98557163718cbf9ebd53",
    "624f98557163718cbf9ebd54",
    "624f98557163718cbf9ebd55",
    "624f98557163718cbf9ebd56",
    "624f98557163718cbf9ebd57",
    "624f98557163718cbf9ebd58",
    "624f98557163718cbf9ebd59",
    "624f98557163718cbf9ebd5a",
    "624f98557163718cbf9ebd5b",
    "624f98557163718cbf9ebd5c",
    "624f98557163718cbf9ebd5d",
    "624f98557163718cbf9ebd5e",
    "624f98557163718cbf9ebd5f",
    "624f98557163718cbf9ebd60",
    "624f98557163718cbf9ebd61",
    "624f98557163718cbf9ebd62",
    "624f98557163718cbf9ebd63",
    "624f98557163718cbf9ebd64",
    "624f98557163718cbf9ebd65",
    "624f98557163718cbf9ebd66",
    "624f98557163718cbf9ebd67",
    "624f98557163718cbf9ebd68",
    "624f98557163718cbf9ebd69",
    "624f98557163718cbf9ebd6a",
    "624f98557163718cbf9ebd6b",
    "624f98557163718cbf9ebd6c",
    "624f98557163718cbf9ebd6d",
    "624f98557163718cbf9ebd6e",
    "624f98557163718cbf9ebd6f",
    "624f98557163718cbf9ebd70",
    "624f98557163718cbf9ebd71",
    "624f98557163718cbf9ebd72",
    "624f98557163718cbf9ebd73",
    "624f98557163718cbf9ebd74",
    "624f98557163718cbf9ebd75",
    "624f98557163718cbf9ebd76",
    "624f98557163718cbf9ebd77",
    "624f98557163718cbf9ebd78",
    "624f98557163718cbf9ebd79",
    "624f98557163718cbf9ebd7a",
    "624f98557163718cbf9ebd7b",
    "624f98557163718cbf9ebd7c",
    "624f98557163718cbf9ebd7d",
    "624f98557163718cbf9ebd7e",
    "625083f25242bbae384cabc3",
    "6250847d5242bbae384cabc4",
    "6250b94888593793d15bd138",
    "6253678003c2c73bdf4761bb",
    "625368de03c2c73bdf4761bc",
    "62536b1a03c2c73bdf4761bf",
    "62536e01b2fd74721e1b725e",
  ];

  const skills = [
    "IT support",
    "child care",
    "electrial technique",
    "first aid and treatment",
    "food preparation",
    "laundry",
    "plumbing and repair",
    "search and rescue",
    "senior care",
    "shelter building",
    "shelter hygiene",
    "supply logistics",
  ];

  const helperNum = Math.ceil(Math.random() * 5);
  const ownerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
  const skillNeed = skills[Math.floor(Math.random() * skills.length)];

  console.log({ ownerId: ownerId, skillNeed: skillNeed, helperNum: helperNum });

  try {
    const ownerInfo = await db
      .collection("campers")
      .find({ _id: ObjectId(ownerId) })
      .toArray();
    console.log(ownerInfo);

    let newValue = {
      taskOwner: ownerId,
      taskSkill: skillNeed,
      location: `${ownerInfo[0].campNum}-${ownerInfo[0].shelterNum}`,
      helperNum: helperNum,
      taskHelpers: [],
      status: "recruit",
    };

    const newTask = await db.collection("helpTasks").insertOne(newValue);
    // sendResponse(res, 200, newValue, "a new help task is successfully added.");
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

// helpTasksGenerator();

module.exports = { helpTasksGenerator };
