import express from 'express';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

const server = app.listen(PORT, () => {
  console.log(`Coming at you live from port ${server.address().port}!`);
});
