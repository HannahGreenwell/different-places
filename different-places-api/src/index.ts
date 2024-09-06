import logger from 'loglevel';
import app from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Coming at you live from port ${PORT}!`);
});
