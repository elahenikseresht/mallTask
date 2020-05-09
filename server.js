const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const expressValidator = require("express-validator");
global.config = require("./modules/config");
const productRout = require("./modules/routes/productRout");
const errorHandler = require("./utils/errorHandler");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/products_test");
mongoose.Promise = global.Promise;

app.use("/api/v1/product/", productRout);
app.use("./public/files", express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));
//app.use(expressValidator());

app.use(errorHandler.err.bind(errorHandler));
app.use(errorHandler.notFoundError.bind(errorHandler));

const server = app.listen(config.port, () => {
  console.log(`Server running at Port ${config.port}`);
});
