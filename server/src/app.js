import express from 'express';
import cores from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import * as middlewares from './utils/middlewares.js';
import api from './api/index.js';

const app = express();

app.use(express.json());
app.use(cores());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api', api);
app.use(middlewares.notFound);

export default app;
