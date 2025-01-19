const { System } = require("../models");
const Controller = require("./controller");

const addConfigsFromSystem = async (system, configIds) => {
  return system.addOtpConfig(configIds, { through: "system_otpConfigs" });
};

const updateConfigsFromSystem = async (system, configs) => {
  await system.setOtpConfigs([]);
  const promises = addConfigsFromSystem(system, configs);
  return promises;
};

module.exports = {
  ...Controller(System),
  add: async (req, res, next) => {
    try {
      const system = await System.create(req.body);
      if (req.body.otpConfigs && req.body.otpConfigs.length != 0) {
        const promises = await addConfigsFromSystem(
          system,
          req.body.otpConfigs
        );

        await Promise.all(promises);

        res.json({ otpConfigs: promises, system });
      } else {
        res.json(system);
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const system = await System.findByPk(req.params.id);
      if (req.body.otpConfigs) {
        await updateConfigsFromSystem(system, req.body.otpConfigs);
      } else {
        await system.setOtpConfigs([]);
      }

      await System.update(req.body, { where: { id: req.params.id } });
      const obj = await System.findOne({ where: { id: req.params.id } });
      return obj != null ? res.json(obj) : res.status(404).end();
    } catch (error) {
      next(error);
    }
  },
};
