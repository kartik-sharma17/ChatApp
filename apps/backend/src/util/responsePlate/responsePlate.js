
export const ResponsePlate = (res, { success = true, data = null, message = '', status = 200 }) => {
  res.status(status).json({
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}
