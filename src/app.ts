import express from "express";
import compression from "compression";
import * as bodyParser from "body-parser";
import * as exphbs from "express-handlebars";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path from "path";

import { PORT, MORGAN_METHOD } from "./utils/env";

import router from "./routes/main.route";

const app: express.Application = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan(`${MORGAN_METHOD}`));
app.use(helmet());
app.use(cors());
app.use(compression());

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(router);

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).render("404Page", {
      layout: false,
    });
  }
);

app.listen(PORT, () => {
  return console.log(`GitWiz is running on port ${PORT}`);
});
