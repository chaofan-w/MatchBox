"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
//--------------require endpoint methods--------------------------------

//---handle camper signin signup-------------------------------
const { addNewCamper } = require("./handleCampers/AddNewCamper");
const { getCamper } = require("./handleCampers/GetCamper");
const { getCamperById } = require("./handleCampers/GetCamperById");
const { getCampKeys } = require("./handleCampers/getCampKeys");

//---handle messages--------------------------------------------
const { getCamperMsgs } = require("./handleCampers/GetCamperMsgs");
const { changeMsgRead } = require("./handleCampers/ChangeMsgRead");
const { updateCamperMsg } = require("./handleCampers/UpdateCamperMsg");
const { msgToSkillGroup } = require("./handleCampers/MsgToSkillGroup");
const { pushMsgToHelpers } = require("./handleCampers/PushMsgToHelpers");

//---handle helpTaks--------------------------------------------
const { addNewHelpTask } = require("./handleTasks/AddNewHelpTask");
const { addHelperToTask } = require("./handleTasks/AddHelperToTask");
const { deleteHelperFromTask } = require("./handleTasks/DeleteHelperFromTask");
const { changeTaskDone } = require("./handleTasks/ChangeTaskDone");
const { deleteHelpTask } = require("./handleTasks/DeleteHelpTask");
const { getHelpTasks } = require("./handleTasks/GetHelpTasks");
const {
  getHelpTasksByCamperId,
} = require("./handleTasks/GetHelpTasksByCamperId");
const { uploadAudio } = require("./handleVOMsgs/uploadAudio");
const {
  transcribeAndUpdateMsgs,
} = require("./handleVOMsgs/transcribeAndUpdateMsgs");
const { getVOMsgs } = require("./handleVOMsgs/getVOMsgs");
const { pagination } = require("./handleTasks/Pagination");
const { addInputMsg } = require("./handleVOMsgs/addInputMsg");

const port = process.env.PORT || 4000;
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
  .post("/api/add-newhelptask", addNewHelpTask) //post new help tasks to recruit people
  .delete("/api/delete-helptask", deleteHelpTask) //post new help tasks to recruit people
  .post("/api/helptasks/add-helper", addHelperToTask)
  .post("/api/helptasks/delete-helper", deleteHelperFromTask)
  .post("/api/helptasks/taskdone", changeTaskDone)
  .get("/api/helptasks", getHelpTasks)
  .get("/api/helptasks/:camperId", getHelpTasksByCamperId)
  .get("/api/helptasks/pagination/:page/:limit", pagination)

  .post("/api/add-newcamper", addNewCamper) //sign up use
  .get("/api/camper", getCamper) // for login individual page
  .get("/api/camper/:camperId", getCamperById) // for login individual page
  .get("/api/camper/campkeys/:keys", getCampKeys)
  .post("/api/camper/add-msg", updateCamperMsg)
  .get("/api/camper/msg/:camperId", getCamperMsgs)
  .post("/api/camper/msg/:camperId/:msgTime", changeMsgRead)
  .post("/api/camper/groupmsgs/:skills", msgToSkillGroup)
  .post("/api/camper/helpermsgs", pushMsgToHelpers)

  .post("/api/vomsgs/upload", uploadAudio)
  .get("/api/vomsgs/transcribe", transcribeAndUpdateMsgs)
  .get("/api/vomsgs/get-all", getVOMsgs)
  .post("/api/vomsgs/add-inputmsg", addInputMsg)

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
  .listen(port, () => console.log(`Listening on port ${port}`));
