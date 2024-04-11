// USES AS MIDDLEWARE TO TO CHECK ANY JSON ERROR OCCURS WHILE USING API

function jsonErrorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "error",
      message: "Invalid JSON payload",
    });
  }
  next();
}

module.exports = jsonErrorHandler;
