module.exports.dataHandler = function({ data, status, error }, res) {
  const resStatus = status || 200;
  return res.status(resStatus).json({
    status: resStatus,
    data: data,
    error: error
  });
};