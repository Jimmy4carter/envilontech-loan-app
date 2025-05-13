const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  console.error('🔴 Error Middleware Triggered:');
  console.error(err.stack); // Already logged
  console.error('Message:', err.message);
  console.error('Details:', err);

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};
