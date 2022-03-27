const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvent = async (message, fileName) => {
  try {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logMessage = `${dateTime}\t ${uuid()}\t ${message}\n`;

    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", fileName),
      logMessage
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvent;
