const error = (error, _req, res, _next) => {
  logger.error("Unexpected error %s", error);
  res.status(500).send({ code: 500, message: "Unexpected error" });
};

module.exports = error;
