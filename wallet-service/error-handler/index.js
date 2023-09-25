const AppError = require('./app-error');

const handleSequelizeValidationError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  };
  
  const handleSequelizeUniqueConstraintError = (err) => {
    const message = `This ${JSON.stringify(err.fields)} already exists`;
    return new AppError(message, 400);
  };
  
  const dbHandleError = (err) => {
    let response;
    switch (err.name) {
      case 'SequelizeValidationError':
        response = handleSequelizeValidationError(err);
        break;
      case 'SequelizeUniqueConstraintError':
        response = handleSequelizeUniqueConstraintError(err);
        break;
      default:
        break;
    }
    return response;
  };
  
  const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
      res.status(err.status);
      res.json({ errors: [{ field: 'request', message: err.message, code: err.code }] });
    } else {
      const dbError = dbHandleError(err);
      if (dbError && dbError instanceof AppError) {
        res.status(dbError.status);
        res.json({ errors: [{ field: 'request', message: dbError.message }] });
      } else {
        return res.sendStatus(500);
      }
    }
  };
  
  module.exports = errorHandler;