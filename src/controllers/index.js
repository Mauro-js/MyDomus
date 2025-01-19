const models = require("../models");
const Controller = require("./controller");
const systemController = require("./system");

const controllersEnabled = ["OtpConfig", "Config"];

const allControllers = controllersEnabled.reduce((controllers, c) => {
  controllers[`${c.toLocaleLowerCase()}Controller`] = Controller(models[c]);
  return controllers;
}, {});

module.exports = {
  ...allControllers,
  systemController,
};
