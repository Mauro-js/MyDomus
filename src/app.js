var express = require("express");
const cors = require("cors");
var routes = require("./routes");
var helmet = require("helmet");
const { nocache, error } = require("./midlewares");
//const { httpLogger } = require("./logger");
var app = express();

app.use((_req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.disable("x-powered-by");
app.use(nocache);
app.use(cors());

app.use(helmet());

//app.use(httpLogger);
app.use(express.json());


app.use("/", routes, error);
module.exports = app;
