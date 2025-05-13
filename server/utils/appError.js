/**
 * Custom Error Class for handling application-specific errors.
 * Extends the built-in Error class to include additional properties
 * such as statusCode, status, and isOperational for better error handling.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    // Capture the stack trace for debugging purposes
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;