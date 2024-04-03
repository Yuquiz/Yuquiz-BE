import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()

import routes from "./routes/router.js";
import logger from "./middlewares/logger.js";
import authJWT from "./middlewares/authJWT.js";

const APP = express();
const PORT = process.env.PORT;

APP.use(logger);
APP.use(express.json());
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(routes);
APP.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})