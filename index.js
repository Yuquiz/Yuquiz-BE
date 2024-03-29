import express from "express";
import routes from "./routes/router.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config()

const APP = express();
const PORT = process.env.PORT;

APP.use(express.json());
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(routes);
APP.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
})