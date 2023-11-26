import dotenv from 'dotenv';

dotenv.config();

import express, { urlencoded, json } from 'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session'
import MongoStore from 'connect-mongo';

import produtoRoutes from './src/routes/produtoRoutes';
import licencaRoutes from './src/routes/licencaRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.connectMongoose();
  }

  middlewares() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(flash());

    this.app.use(session({
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
    }));
  }

  routes() {
    this.app.use('/produtos/', produtoRoutes);
    this.app.use('/licenca/', licencaRoutes);
  }

  connectMongoose() {
    mongoose.connect(process.env.CONNECTIONSTRING)
      .then(() => {
        this.app.emit('pronto');
      })
      .catch((e) => console.log(e));
  };
}

export default new App().app;
