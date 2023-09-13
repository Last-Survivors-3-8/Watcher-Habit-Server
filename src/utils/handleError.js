const handleError = (res, error) => {
  res.status(error.STATUS_CODE).json({ error: error.MESSAGE });
};

module.exports = handleError;
