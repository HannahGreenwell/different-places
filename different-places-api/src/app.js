import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import logger from 'loglevel';
import { router as placesRouter } from './routes/places';
import errorMiddleware from './middlewares/error-middleware';

const app = express();

logger.setLevel('info');

app.use('/api', placesRouter);
app.use(errorMiddleware);

export default app;
