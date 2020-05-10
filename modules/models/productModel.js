const mongoose = require("mongoose");
const AppError = require("./../../utils/appError");
const fs = require("fs");
const tagV = JSON.parse(fs.readFileSync(`${__dirname}/tagV.json`));
const timestamps = require("mongoose-timestamp");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "محصول باید عنوان داشته باشد"],
      unique: [true, "عنوان محصول تکراریست"],
      maxlength: [40, "عنوان محصول میتواند حداکتر 40 حرف داشته باشد."],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    imageCover: {
      type: String,
      default: "product.png",
    },
    images: {
      type: [String],
      default: ["product.png"],
    },
    summary: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "عنوان محصول میتواند حداکتر 300 حرف داشته باشد."],
    },
    tages: [
      {
        type: {
          type: String,
        },
        tag: String,
        subTag: String,
      },
    ],
    //     owner: {
    //       type: mongoose.Schema.ObjectId,
    //       ref: "User",
    //       required: [true, "هر رویداد یک ایجاد کننده دارد."],
    //     },
    //     becomingOfiicialDate: Date,
    //   },
    owner: {
      type: String,
      required: [true, "صاحب محصول باید عنوان داشته باشد"],
      maxlength: [40, "عنوان صاحب محصول میتواند حداکتر 40 حرف داشته باشد."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "محصول باید قیمت داشته باشد"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre("save", function(next) {
  this.tages.forEach((element) => {
    if (!tagV[element.tag].includes(element.subTag)) {
      return next(
        new AppError(
          `برچسب های ${element.tag} و${element.subTag} باهم هماهنگ نیستند`,
          400
        )
      );
    }
  });
  next();
});
productSchema.plugin(timestamps);
//setting createdAt and updatedAt atuomaticly
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
