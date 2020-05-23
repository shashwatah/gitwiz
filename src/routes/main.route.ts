import express from "express";

import GithubController from './../controllers/github.controller';
import GitlabController from './../controllers/gitlab.controller';
import { GITHUB_TOKEN, GITLAB_TOKEN } from './../utils/env';

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
    const controller: GitlabController = new GitlabController(req.body.query, `${GITLAB_TOKEN}`);
    await controller.processData().then(data => res.status(200).send(data))
    .catch(err => {
        res.status(500).send(err.message)
    });
});

export default router;