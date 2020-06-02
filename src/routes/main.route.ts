import express from "express";

import MainController from "./../controllers/main.controller";
import { cache } from "../utils/cache";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).render("indexPage", {
    layout: false,
  });
});

router.get("/search", (req: express.Request, res: express.Response) => {
  res.status(200).render("searchPage", {
    query: req.query.query,
    layout: false,
  });
});

router.post("/fetch", async (req: express.Request, res: express.Response) => {
  const controller: MainController = new MainController(req.body.query, cache);
  await controller
    .getResults()
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      console.log(error);
      res.status(400).send("Couldn't lookup what you entered");
    });
});

export default router;
