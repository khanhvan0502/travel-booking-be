const successResponse = (res, data = {}, message = "Success", code = 200) => {
  return res.status(code).json({
    status: true,
    data,
    message,
  });
};

const errorResponse = (res, data = {}, message = "Error", code = 500) => {
  return res.status(code).json({
    status: false,
    data,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
