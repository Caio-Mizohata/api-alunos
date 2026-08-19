import express, { urlencoded } from "express";
import router from "./routes/alunos.routes.js";


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(router);
  }
}

export default new App().app;