import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => console.log('connected to database'));

import usersRouter from './routes/users';

var app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/users', usersRouter);

export default app;
