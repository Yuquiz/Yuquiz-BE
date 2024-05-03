// Props to:
// https://medium.com/swlh/the-easiest-way-to-start-using-swagger-in-node-js-54326864e74f

import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = yamljs.load("./configs/swaggerDocs.yaml");
export default function(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}