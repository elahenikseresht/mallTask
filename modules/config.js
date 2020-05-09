const path = require("path");

module.exports = {
  port: 2000,
  secret: "awdawdaw@3q4w#Rr3rw#Rrerrwef3wESE4#4#$",
  path: {
    controllers: {
      productController: path.resolve(
        "./modules/controllers/productController"
      ),
    },
    model: path.resolve("./modules/models"),
    transform: path.resolve("./modules/transforms"),
    controller: path.resolve("./modules/controllers"),
  },
};
