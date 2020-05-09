const Controller = require("./controller");
const Product = require("./../models/productModel");
const AppError = require("./../../utils/appError");
module.exports = new (class ProductController extends Controller {
  constructor() {
    super(Product);
  }
  async getProductsByTag(req, res) {
    try {
      if (!req.body.tag) {
        return next(new AppError("این برچسب وجود ندارد", 204));
      }
      const docs = await Products.aggregate([
        {
          $unwind: "$tages",
        },
        {
          $match: {
            $or: [
              { "tages.tag": req.body.tag },
              { "tages.subTag": req.body.tag },
            ],
          },
        },
      ]);

      if (!docs) {
        return next(new AppError("ایتم پیدا نشد", 204));
      }
      return res.status(200).json({
        status: "success",
        data: docs,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }
})();
