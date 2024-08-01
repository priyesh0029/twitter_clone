

class AppError extends Error {
    statusCode 
    status
    isOperational
    errorMessage
    constructor(message, statusCode) {
      super(message);
      
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.errorMessage = message
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default AppError;