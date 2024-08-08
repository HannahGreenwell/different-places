import express from 'express';
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

function errorMiddleware(error, req, res, next) {
  logger.error(error);
  res.status(500);
  res.json({
    message: error.message,
    ...(process.env.NODE_ENV === 'production'
      ? null
      : {
          stack: error.stack,
        }),
  });
}
