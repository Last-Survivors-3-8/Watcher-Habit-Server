const handleError = (res, error, data = null) => {
  const responseBody = { error: error.MESSAGE };
  if (data) {
    responseBody.data = data;
  }
  res.status(error.STATUS_CODE).json(responseBody);
};

module.exports = handleError;
