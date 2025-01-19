const NodeCache = require("node-cache");
const { ttl } = require("../config").cache;

const cache = new NodeCache({
  stdTTL: ttl,
  useClones: false,
});

module.exports = cache;
