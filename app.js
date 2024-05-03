import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config()

import routes from "./routes/router.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerDocs from "./middlewares/swaggerDocs.js";

const APP = express();
const PORT = process.env.PORT;

APP.use(logger);
APP.use(express.json());
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(routes);
APP.use(errorHandler);
swaggerDocs(APP);
APP.use("/", (req, res) => res.send({
    msg: "Welcome to Quizin! Please head to `/api-docs` to see the operations you could do with this API"
}));

APP.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})