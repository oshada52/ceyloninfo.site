import express from 'express';
import cores from 'cors';

const app = express();

app.use(cores());

app.get('/', (req, res) => {
  res.send('hello World');
});

export default app;
