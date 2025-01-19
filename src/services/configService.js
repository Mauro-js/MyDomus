const fs = require("fs");
const { DateTime } = require("luxon");
const { configService } = require("../config");
const { Config } = require("../models");

const { ttl } = configService;

let config = null;
let updated = null;

const LUA = "lua";
const SMS_OTP = "smsOTP";
const SERVICE_BROKER = "serviceBroker";
const SMS_WHITELIST = "smsWhitelist";
const OTP_DEFAULT_CONFIG = "otpDefaultConfig";
const AUTHORIZATION = "authorization";
const TUID = "tuID";

const defaults = {
  [LUA]: {
    jwtPublicKey: fs.readFileSync("conf/lua.key"),
  },

  [SMS_OTP]: {
    maxOtpResent: 3,
    maxVerificationAttempts: 3,
    blockedTimeout: 300, //5 min in seconds
  },
  [SERVICE_BROKER]: {
    countryCode: "598",
    url: "https://servicebroker.sva.antel.com.uy/api/SND",
    user: "ELON",
    password: "43L0NT3L",
    sender: 3566,
  },
  [SMS_WHITELIST]: ["59898811438"],
  [OTP_DEFAULT_CONFIG]: 1,
  [AUTHORIZATION]: {
    secret: "25RwuALtVvAJxqLGUxYtl5aMCC9KrRPSTkFuwSo4JZNbroF5L8ypxj7Yz4Kl7gyw",
    enabled: true,
    adminRol: "admin",
    systemName: "elon-busman",
  },
};

const getConfig = async (key) => {
  const allConfig = await getAllConfig();
  return allConfig[key];
};

const getAllConfig = async () => {
  if (!config || !updated || updated.plus({ seconds: ttl }) < DateTime.now()) {
    const res = await Config.findAll();
    config = res.reduce((all, curr) => {
      all[curr.key] = curr.value;
      return all;
    }, {});
    updated = DateTime.now();
  }
  return { ...defaults, ...config };
};

module.exports = {
  defaults,
  getConfig,
  getAllConfig,
  LUA,
  SMS_OTP,
  SERVICE_BROKER,
  SMS_WHITELIST,
  OTP_DEFAULT_CONFIG,
  AUTHORIZATION,
};
