const express = require("express");
const router = express.Router();
const ProductController = require("./../Controllers/productController");

router
  .route("/")
  .get(ProductController.getAll.bind(ProductController))
  .post(ProductController.createOne.bind(ProductController));

router
  .route("/:id")
  .post(ProductController.getOne.bind(ProductController))
  .patch(ProductController.updateOne.bind(ProductController))
  .delete(ProductController.deleteOne.bind(ProductController));

router.post(
  "/getProductsByTag",
  ProductController.getProductsByTag.bind(ProductController)
);
//router.get("/test", ProductController.test.bind(ProductController));
module.exports = router;
