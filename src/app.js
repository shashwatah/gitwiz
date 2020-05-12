require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan(process.env.MORGAN_METHOD));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).render("indexPage", {
        layout: false
    });
});

app.listen(process.env.PORT, () => {
    console.log(`GitWiz is running on port ${process.env.PORT}`);
});