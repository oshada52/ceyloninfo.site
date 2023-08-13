import express from 'express';
import cores from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(cores());
app.use(morgan('dev'));
app.use(helmet());

app.get('/api', (req, res) => {
  res.send('hello World');
});

export default app;
