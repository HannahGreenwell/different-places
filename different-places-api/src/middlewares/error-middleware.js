import logger from 'loglevel';

function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    next(err);
  } else {
    logger.error(err);
    res.status(500);
    res.json({
      message: err.message,
      ...(process.env.NODE_ENV === 'production'
        ? null
        : {
            stack: err.stack,
          }),
    });
  }
}

export default errorMiddleware;
