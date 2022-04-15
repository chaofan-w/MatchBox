const axios = require("axios");
const fs = require("fs");
const { postMsgId } = require("./postMsgId");

const sendResponse = (res, status, data, message = "no message included.") => {
  return res.status(status).json({ status, data, message });
};

const uploadAudio = (req, res) => {
  const dir = req.body.dir;
  console.log(dir);

  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "b555fcac6593482881d6ea16c8537589",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  });

  try {
    const filenames = fs.readdirSync(dir);

    filenames.forEach((filename) => {
      const file = `${dir}${filename}`;
      fs.readFile(file, async (err, data) => {
        if (err) {
          return console.log(err);
        }
        await assembly.post("/upload", data).then(async (res) => {
          console.log("upload_url: ", res.data["upload_url"]);
          await assembly
            .post("/transcript", { audio_url: res.data["upload_url"] })
            .then(async (res) => {
              timestamp = new Date();
              postMsgId(timestamp, res.data.id);
            });
        });
      });
    });
    sendResponse(res, 200, "data updated to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { uploadAudio };
