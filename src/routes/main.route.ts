import express from "express";

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

router.get("/fetch", (req: express.Request, res: express.Response) => {
    res.status(200).json({"data": "ffsdf"});
});

export default router;