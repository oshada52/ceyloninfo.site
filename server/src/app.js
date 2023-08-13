import express from 'express';
import cores from 'cors';

const app = express();

app.use(cores());

app.get('/', (req, res) => {
  res.send('hello World');
});

app.get('/api', (req, res) => {
 res.send('api');
});

export default app;
