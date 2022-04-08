"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
//--------------require endpoint methods--------------------------------
const { addNewCamper } = require("./handleCampers/AddNewCamper");
const { getCamper } = require("./handleCampers/GetCamper");
const { updateCamperMsg } = require("./handleCampers/UpdateCamperMsg");
const { getCamperMsgs } = require("./handleCampers/GetCamperMsgs");
const { changeMsgRead } = require("./handleCampers/ChangeMsgRead");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  .post("/api/add-newcamper", addNewCamper) //sign up use
  .get("/api/camper", getCamper) // for login individual page
  .post("/api/camper/add-msg", updateCamperMsg)
  .get("/api/camper/msg/:camperId", getCamperMsgs)
  .post("/api/camper/msg/:camperId/:msgTime", changeMsgRead)

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(4000, () => console.log(`Listening on port 4000`));
