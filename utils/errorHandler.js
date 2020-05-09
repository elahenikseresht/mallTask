module.exports = new (class ErrorHandler {
  err(err, req, res, next) {
    if (err.hasOwnProperty("code") && err.code === "LIMIT_FILE_SIZE") {
      res.status(500).json({
        data: {
          message: "حجم فایل بیش از 1 مگابایت است.",
        },
        success: false,
      });
    } else {
      res.status(500).json({
        data: {
          ...err,
        },
        success: false,
      });
    }
  }

  notFoundError(req, res) {
    res.status(404).json({
      data: {
        error: "404",
      },
      success: false,
    });
  }
})();
