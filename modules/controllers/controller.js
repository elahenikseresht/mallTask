module.exports = class Controller {
  constructor(model) {
    this.Model = model;
  }
  async deleteOne(req, res) {
    try {
      const doc = await this.Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return res.status(204).json({
          data: "ایتم پیدا نشد",
          success: false,
        });
      }
      return res.status(200).json({
        message: " ایتم پاک شد",
        data: doc,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }

  async updateOne(req, res) {
    try {
      const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false,
      });
      if (!doc) {
        return res.status(204).json({
          data: "ایتم پیدا نشد",
          success: false,
        });
      }
      return res.status(200).json({
        message: "ایتم به روز شد",
        data: doc,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }

  async createOne(req, res) {
    try {
      const doc = await this.Model.create(req.body);
      return res.status(200).json({
        message: " آیتم ساخته شد",
        data: doc,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }

  async getOne(req, res, next) {
    try {
      const doc = await this.Model.findById(req.params.id);
      if (!doc) {
        return res.status(204).json({
          data: "ایتم پیدا نشد",
          success: false,
        });
      }
      return res.status(200).json({
        status: "success",
        data: doc,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }

  async getAll(req, res) {
    try {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;
      console.log(this.Model);
      const doc = await this.Model.find()
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        status: "success",
        length: doc.length,
        data: doc,
      });
    } catch (error) {
      return res.status(400).json({
        data: error.toString(),
        success: false,
      });
    }
  }
};
