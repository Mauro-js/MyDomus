require("dotenv").config();
const fs = require("fs");

const database = require("./database");

const app = {
  environment: process.env.NODE_ENV || "local",
  port: process.env.APP_PORT || 4000,
  trustProxy: process.env.TRUST_PROXY || false,
  admin: {
    authJWTSecret:
      process.env.AUTH_JWT_SECRET ||
      "25RwuALtVvAJxqLGUxYtl5aMCC9KrRPSTkFuwSo4JZNbroF5L8ypxj7Yz4Kl7gyw",
    authSystemName: process.env.AUTH_SYSTEM_NAME || "elon-busman",
  },
};

const log = {
  level: process.env.LOG_LEVEL || "info",
  filename: process.env.LOG_FILENAME || "logs/otp-service.log",
};

const lua = {
  jwtPublicKey: fs.readFileSync(
    process.env.LUA_JWT_PUBKEY_PATH || "conf/lua.key"
  ),
};

const cache = {
  ttl: process.env.CACHE_TTL || 60,
};

const configService = {
  ttl: process.env.CONFIG_TTL || 10 * 60,
};

module.exports = {
  lua,
  app,
  database,
  log,
  cache,
  configService,
};
