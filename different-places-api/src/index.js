import express from 'express';
import 'express-async-errors';
import logger from 'loglevel';
import { router as placesRouter } from './routes/places';

const PORT = process.env.PORT;

const app = express();

logger.setLevel('info');

app.use('/api', placesRouter);

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  logger.info(`Coming at you live from port ${server.address().port}!`);
});

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
