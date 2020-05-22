import express from "express";

import GithubController from './../controllers/github.controller';
import { GITHUB_TOKEN } from './../utils/env';

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).render("indexPage", {
        layout: false
    });
});

router.get("/search", (req: express.Request, res: express.Response) => {
    res.status(200).render("searchPage", {
        query: req.query.query,
        layout: false
    });
});

router.post("/fetch", async (req: express.Request, res: express.Response) => {
    console.log(req.body.query);
    const controller: GithubController = new GithubController(req.body.query, `${GITHUB_TOKEN}`);
    await controller.processData().then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

export default router;