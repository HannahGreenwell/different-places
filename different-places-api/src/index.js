import express from 'express';
import { router as placesRouter } from './routes/places';

const PORT = process.env.PORT;

const app = express();

app.use('/api', placesRouter);

const server = app.listen(PORT, () => {
  console.log(`Coming at you live from port ${server.address().port}!`);
});
