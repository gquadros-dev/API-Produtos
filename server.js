require('dotenv').config();

import express, { urlencoded, json } from 'express';
import session from 'express-session'
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import routes from './src/routes/produtoRoutes';

const app = express();

mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('pronto');
  })
  .catch((e) => console.log(e));

app.use(urlencoded({ extended: true }));
app.use(json());

const sessionStore = MongoStore.create({
  mongoUrl: process.env.CONNECTIONSTRING,
  ttl: 20000,
});

const sessionOptions = session({
  secret: 'asdasdkajf',
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
    ttl: 20000,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 3600 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () =>{
    console.log('Acessar http://localhost:3000');
  });
});
